import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { quoteSession } from '../src/server/quoteSession.js';

test('signed session survives requests and rejects tampering', () => {
  let cookie;
  const res = { setHeader: (_, value) => { cookie = value; } };
  const id = quoteSession({headers:{origin:'https://example.com'}}, res, 'secret');
  assert.match(cookie, /HttpOnly; SameSite=Strict; Secure/);
  const saved = cookie;
  assert.equal(quoteSession({headers:{cookie:saved}}, res, 'secret'), id);
  assert.notEqual(quoteSession({headers:{cookie:saved}}, res, 'different-secret'), id);
});

test('shared store limits fourth quote, allows retries and expires the window', () => {
  const rows = [];
  const sheet = {
    getLastRow: () => rows.length + 1,
    getRange: (_row, col) => ({
      setValue() {},
      getValues: () => rows.map(row => row.slice(col - 1)),
      createTextFinder: id => ({matchEntireCell: () => ({findNext: () => rows.some(row => row[0] === id)})}),
    }),
    appendRow: row => rows.push(row),
  };
  const context = vm.createContext({
    ContentService: {MimeType:{JSON:'json'},createTextOutput: text => ({setMimeType: () => JSON.parse(text)})},
    PropertiesService:{getScriptProperties: () => ({getProperty: key => key === 'QUOTES_SCRIPT_TOKEN' ? 'secret' : 'sheet'})},
    LockService:{getScriptLock: () => ({tryLock: () => true,releaseLock(){}})},
    SpreadsheetApp:{openById: () => ({getSheetByName: () => sheet}),flush(){}},
  });
  vm.runInContext(readFileSync(new URL('../integrations/google-sheets/Code.gs', import.meta.url),'utf8'), context);
  const send = n => context.doPost({postData:{contents:JSON.stringify({token:'secret',sessionId:'11111111-1111-4111-8111-111111111111',requestId:`00000000-0000-4000-8000-${String(n).padStart(12,'0')}`,services:['brunch'],people:50,hours:2,name:'Test',email:'test@example.com',phone:''})}});
  for (let i=1;i<=3;i++) assert.equal(send(i).ok,true);
  assert.equal(send(4).code,'rate_limited');
  assert.equal(send(1).ok,true);
  assert.equal(rows.length,3);
  rows[0][1] = new Date(Date.now()-901000).toISOString();
  assert.equal(send(4).ok,true);
  assert.equal(rows.length,4);
});
