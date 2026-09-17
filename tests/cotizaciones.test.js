import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { validateQuote } from '../api/cotizaciones.js';
const quote = {requestId:'12345678-1234-4234-8234-123456789012',services:['brunch'],people:50,hours:2,name:' Ana ',email:'ana@example.com',phone:''};
test('validates required contact, choices and people; phone is optional', () => {
  assert.equal(validateQuote(quote).name,'Ana');
  assert.equal(validateQuote(quote).hours,2);
  for (const hours of [undefined,0,13,1.5,'2']) assert.throws(()=>validateQuote({...quote,hours}));
  for (const patch of [{name:' '},{email:'wrong'},{services:[]},{services:['unknown']},{people:0},{people:1.5},{website:'bot'},{phone:'letters'}]) assert.throws(()=>validateQuote({...quote,...patch}));
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
    globalThis.fetch=async()=>({ok:true,json:async()=>({ok:true,requestId:quote.requestId})});
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
