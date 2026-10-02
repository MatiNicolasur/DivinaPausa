import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proposalConfirmation } from '../src/server/proposalEmail.js';
const quote = {name:'Ana',email:'ana@example.com',company:'Empresa',service:'brunch',eventDate:'2026-12-12',people:300,commune:'Santiago',schedule:'',details:'',requestId:'test'};
test('confirmation includes event summary and plain text without claiming a reservation', () => {
  const mail = proposalConfirmation(quote);
  for (const value of ['Brunch','12/12/2026','300','Santiago','ana@example.com','no constituye una reserva']) {
    assert.ok(mail.html.includes(value));
    assert.ok(mail.text.includes(value));
  }
  assert.match(proposalConfirmation({...quote,eventDate:''}).html,/Todavía no tengo fecha/);
});
test('does not echo name, company or free details into automatic customer email', () => {
  const mail = proposalConfirmation({...quote,name:'PRIVATE_NAME',company:'PRIVATE_COMPANY',details:'PRIVATE_DETAILS'});
  for (const value of ['PRIVATE_NAME','PRIVATE_COMPANY','PRIVATE_DETAILS']) {
    assert.ok(!mail.html.includes(value));
    assert.ok(!mail.text.includes(value));
  }
  assert.match(mail.html,/divina-pausa-email\.png/);
});
