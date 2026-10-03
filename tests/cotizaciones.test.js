import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { validateQuote } from '../api/cotizaciones.js';

const quote = { privacyAccepted:true, privacyVersion:'2026-10-03-v4', requestId:'12345678-1234-4234-8234-123456789012', schemaVersion:2, service:'brunch', people:250, eventDate:'2026-12-01', dateUnknown:false, commune:'Santiago', schedule:'', details:'', company:'Empresa', name:' Ana ', email:'ana@example.com', phone:'', turnstileToken:'valid-turnstile-token' };

test('validates required choices and contact while phone and schedule are optional', () => {
  assert.equal(validateQuote(quote).name, 'Ana');
  assert.equal(validateQuote(quote).people, 250);
  assert.equal(validateQuote({...quote, eventDate:'', dateUnknown:true}).dateUnknown, true);
  assert.equal(validateQuote({...quote, service:'barra-movil'}).service, 'barra-movil');
  for (const patch of [{privacyAccepted:false}, {privacyVersion:'old'}, {name:' '}, {email:'wrong'}, {service:''}, {service:'unknown'}, {company:''}, {commune:''}, {eventDate:'2026-02-30'}, {eventDate:''}, {dateUnknown:true}, {schedule:'unknown'}, {schemaVersion:1}, {people:0}, {people:1.5}, {website:'bot'}, {phone:'letters'}, {turnstileToken:''}]) {
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
    process.env.TURNSTILE_SECRET_KEY = 'turnstile-test-secret';
    process.env.VERCEL_ENV = 'production';
    globalThis.fetch = async (url, options) => { calls.push({url,options}); if (url.includes('siteverify')) return {ok:true,json:async()=>({success:true,hostname:'localhost',action:'quote_submit'})}; return {ok:true}; };
    const response = await run();
    assert.equal(response.statusCode, 200);
    assert.equal(calls.length, 3);
    assert.equal(calls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.ok(calls.slice(1).every(call => call.url === 'https://api.resend.com/emails'));
    assert.equal(new URLSearchParams(calls[0].options.body).get('response'), 'valid-turnstile-token');
    assert.deepEqual(JSON.parse(calls[1].options.body).to,['contacto@divinapausa.cl']);
    assert.deepEqual(JSON.parse(calls[2].options.body).to,[quote.email]);
    assert.equal(calls[1].options.headers['Idempotency-Key'],`proposal-team-${quote.requestId}`);
    assert.equal(calls[2].options.headers['Idempotency-Key'],`proposal-confirmation-${quote.requestId}`);
    calls.length=0;
    globalThis.fetch=async (url,options) => { calls.push({url,options}); if (url.includes('siteverify')) return {ok:true,json:async()=>({success:false})}; return {ok:true}; };
    assert.equal((await run()).statusCode,403);
    assert.equal(calls.length,1);
    globalThis.fetch=async (url,options) => { calls.push({url,options}); if (url.includes('siteverify')) return {ok:true,json:async()=>({success:true,hostname:'localhost',action:'another_action'})}; return {ok:true}; };
    calls.length=0;
    assert.equal((await run()).statusCode,403);
    assert.equal(calls.length,1);
    globalThis.fetch=async (url,options) => { calls.push({url,options}); if (url.includes('siteverify')) return {ok:true,json:async()=>({success:true,hostname:'attacker.example',action:'quote_submit'})}; return {ok:true}; };
    calls.length=0;
    assert.equal((await run()).statusCode,403);
    assert.equal(calls.length,1);
    process.env.VERCEL_ENV = 'preview';
    process.env.QUOTES_ALLOW_PREVIEW_SEND = 'true';
    globalThis.fetch=async (url,options) => { calls.push({url,options}); if (url.includes('siteverify')) return {ok:true,json:async()=>({success:true,hostname:'localhost',action:'test'})}; return {ok:true}; };
    calls.length=0;
    assert.equal((await run()).statusCode,200);
    assert.equal(calls.length,3);
    process.env.VERCEL_ENV = 'production';
    calls.length=0;
    assert.equal((await run()).statusCode,403);
    assert.equal(calls.length,1);
    globalThis.fetch=async (url,options) => { calls.push({url,options}); throw new Error('Cloudflare unavailable'); };
    calls.length=0;
    const unavailable = await run();
    assert.equal(unavailable.statusCode,503);
    assert.equal(unavailable.body.code,'turnstile_unavailable');
    assert.equal(calls.length,1);
    assert.equal((await run({body:{...quote,people:0}})).statusCode,400);
    assert.equal((await run({method:'GET'})).statusCode,405);
    assert.equal((await run({headers:{'content-type':'application/json',host:'localhost',origin:'https://other.example'}})).statusCode,403);
    assert.equal((await run({headers:{'content-type':'application/json',host:'divinapausa.cl',origin:'http://divinapausa.cl'}})).statusCode,403);
  } finally {
    globalThis.fetch=savedFetch;
    for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
    Object.assign(process.env,savedEnv);
  }
});
