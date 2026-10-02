import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { validateQuote } from '../api/cotizaciones.js';
const quote = {privacyAccepted:true,privacyVersion:'2026-10-02-v1',requestId:'12345678-1234-4234-8234-123456789012',schemaVersion:2,service:'brunch',people:250,eventDate:'2026-12-01',dateUnknown:false,commune:'Otra / por definir',schedule:'',details:'',company:'Empresa',name:' Ana ',email:'ana@example.com',phone:''};
test('validates required contact, choices and people; phone is optional', () => {
  assert.equal(validateQuote(quote).name,'Ana');
  assert.equal(validateQuote(quote).people,250);
  assert.equal(validateQuote({...quote,eventDate:'',dateUnknown:true}).dateUnknown,true);
  for (const patch of [{privacyAccepted:false},{privacyVersion:'old'},{name:' '},{email:'wrong'},{service:''},{service:'unknown'},{company:''},{commune:''},{eventDate:'2026-02-30'},{eventDate:''},{dateUnknown:true},{schedule:'unknown'},{schemaVersion:1},{people:0},{people:1.5},{website:'bot'},{phone:'letters'}]) assert.throws(()=>validateQuote({...quote,...patch}));
});
test('only reports success for a matching confirmed Google write', async () => {
  const originalFetch = globalThis.fetch;
  const oldUrl = process.env.QUOTES_SCRIPT_URL;
  const oldToken = process.env.QUOTES_SCRIPT_TOKEN;
  const run = async (patch={}) => {
    const res={setHeader(){},end(value){this.body=JSON.parse(value);}};
    await handler({method:'POST',headers:{'content-type':'application/json',host:'localhost',origin:'http://localhost'},body:quote,...patch},res);
    return res;
  };
  try {
    delete process.env.QUOTES_SCRIPT_URL;
    assert.equal((await run()).statusCode,503);
    process.env.QUOTES_SCRIPT_URL='https://script.google.com/macros/s/test/exec';
    process.env.QUOTES_SCRIPT_TOKEN='test-only';
    globalThis.fetch=async()=>({ok:true,json:async()=>({ok:true,requestId:quote.requestId,schemaVersion:2,privacyVersion:'2026-10-02-v1'})});
    assert.equal((await run()).statusCode,200);
    globalThis.fetch=async()=>({ok:true,json:async()=>({ok:true,requestId:'different'})});
    assert.equal((await run()).statusCode,502);
    globalThis.fetch=async()=>{throw new Error('timeout');};
    assert.equal((await run()).statusCode,502);
    assert.equal((await run({body:{...quote,people:0}})).statusCode,400);
    assert.equal((await run({method:'GET'})).statusCode,405);
    assert.equal((await run({headers:{'content-type':'application/json',host:'localhost',origin:'https://other.example'}})).statusCode,403);
  } finally {
    globalThis.fetch=originalFetch;
    for (const [key,value] of [['QUOTES_SCRIPT_URL',oldUrl],['QUOTES_SCRIPT_TOKEN',oldToken]]) value === undefined ? delete process.env[key] : process.env[key]=value;
  }
});

test('Resend runs only after a new confirmed save; email failure preserves success', async () => {
  const savedEnv = { ...process.env };
  const savedFetch = globalThis.fetch;
  const calls = [];
  const run = async () => {
    const res = {setHeader(){},end(value){this.body=JSON.parse(value);}};
    await handler({method:'POST',headers:{'content-type':'application/json',host:'localhost',origin:'http://localhost'},body:quote},res);
    return res;
  };
  try {
    process.env.QUOTES_SCRIPT_URL='https://script.google.com/macros/s/test/exec';
    process.env.QUOTES_SCRIPT_TOKEN='test-only';
    process.env.QUOTES_EMAIL_ENABLED='true';
    process.env.RESEND_API_KEY='test-only';
    process.env.QUOTES_EMAIL_FROM='contacto@divinapausa.cl';
    process.env.QUOTES_EMAIL_TO='contacto@divinapausa.cl';
    let result = {ok:true,requestId:quote.requestId,schemaVersion:2,privacyVersion:'2026-10-02-v1',duplicate:false};
    globalThis.fetch = async (url, options) => {
      calls.push({url, options});
      if (url.includes('script.google.com')) return {ok:true,json:async()=>result};
      return {ok:false};
    };
    assert.equal((await run()).statusCode,200);
    assert.equal(calls.length,3);
    assert.equal(JSON.parse(calls[1].options.body).reply_to,quote.email);
    assert.equal(calls[1].options.headers['Idempotency-Key'],`proposal-team-${quote.requestId}`);
    const confirmation = JSON.parse(calls[2].options.body);
    assert.deepEqual(confirmation.to,[quote.email]);
    assert.equal(confirmation.reply_to,'contacto@divinapausa.cl');
    assert.match(confirmation.html,/Una buena pausa/);
    assert.equal(calls[2].options.headers['Idempotency-Key'],`proposal-confirmation-${quote.requestId}`);
    calls.length=0;
    result={...result,duplicate:true};
    assert.equal((await run()).statusCode,200);
    assert.equal(calls.length,1);
    calls.length=0;
    result={ok:true,requestId:quote.requestId};
    assert.equal((await run()).statusCode,502);
    assert.equal(calls.length,1);
  } finally {
    globalThis.fetch=savedFetch;
    for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
    Object.assign(process.env,savedEnv);
  }
});
