import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { validateQuote } from '../api/cotizaciones.js';

const quote = { privacyAccepted:true, privacyVersion:'2026-10-02-v2', requestId:'12345678-1234-4234-8234-123456789012', schemaVersion:2, service:'brunch', people:250, eventDate:'2026-12-01', dateUnknown:false, commune:'Santiago', schedule:'', details:'', company:'Empresa', name:' Ana ', email:'ana@example.com', phone:'' };

test('validates required choices and contact while phone and schedule are optional', () => {
  assert.equal(validateQuote(quote).name, 'Ana');
  assert.equal(validateQuote(quote).people, 250);
  assert.equal(validateQuote({...quote, eventDate:'', dateUnknown:true}).dateUnknown, true);
  for (const patch of [{privacyAccepted:false}, {privacyVersion:'old'}, {name:' '}, {email:'wrong'}, {service:''}, {service:'unknown'}, {company:''}, {commune:''}, {eventDate:'2026-02-30'}, {eventDate:''}, {dateUnknown:true}, {schedule:'unknown'}, {schemaVersion:1}, {people:0}, {people:1.5}, {website:'bot'}, {phone:'letters'}]) {
    assert.throws(() => validateQuote({...quote, ...patch}));
  }
});

test('sends the request and confirmation through Resend, without calling another storage service', async () => {
  const savedEnv = {...process.env};
  const savedFetch = globalThis.fetch;
  const calls = [];
  const run = async (patch={}) => {
    const res = {headers:{}, setHeader(key,value){this.headers[key]=value;}, end(value){this.body=JSON.parse(value);}};
    await handler({method:'POST', headers:{'content-type':'application/json',host:'localhost',origin:'http://localhost'}, body:quote, ...patch}, res);
    return res;
  };
  try {
    process.env.QUOTES_EMAIL_ENABLED = 'true';
    process.env.RESEND_API_KEY = 'test-only';
    process.env.QUOTES_EMAIL_FROM = 'Divina Pausa <contacto@divinapausa.cl>';
    process.env.QUOTES_EMAIL_TO = 'contacto@divinapausa.cl';
    globalThis.fetch = async (url, options) => { calls.push({url,options}); return {ok:true}; };
    const response = await run();
    assert.equal(response.statusCode, 200);
    assert.equal(calls.length, 2);
    assert.ok(calls.every(call => call.url === 'https://api.resend.com/emails'));
    assert.deepEqual(JSON.parse(calls[0].options.body).to,['contacto@divinapausa.cl']);
    assert.deepEqual(JSON.parse(calls[1].options.body).to,[quote.email]);
    assert.equal(calls[0].options.headers['Idempotency-Key'],`proposal-team-${quote.requestId}`);
    assert.equal(calls[1].options.headers['Idempotency-Key'],`proposal-confirmation-${quote.requestId}`);
    calls.length=0;
    globalThis.fetch=async (url,options) => { calls.push({url,options}); return {ok:false}; };
    assert.equal((await run()).statusCode,502);
    assert.equal(calls.length,2);
    assert.equal((await run({body:{...quote,people:0}})).statusCode,400);
    assert.equal((await run({method:'GET'})).statusCode,405);
    assert.equal((await run({headers:{'content-type':'application/json',host:'localhost',origin:'https://other.example'}})).statusCode,403);
  } finally {
    globalThis.fetch=savedFetch;
    for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
    Object.assign(process.env,savedEnv);
  }
});
