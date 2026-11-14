import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,industries,services} from '../src/model.js';
test('年間の価値と費用差引を算出する',()=>assert.deepEqual(calculate({trips:12,perTrip:3000,hours:2,hourly:5000,fee:100000}),{travel:36000,time:120000,total:156000,net:56000}));
test('利用なし・費用超過を正しく表示する',()=>assert.equal(calculate({trips:0,perTrip:0,hours:0,hourly:0,fee:100}).net,-100));
test('負値・空値・非有限値・過大値を拒否する',()=>{for(const v of [-1,NaN,Infinity,10000001])assert.throws(()=>calculate({trips:v,perTrip:0,hours:0,hourly:0,fee:0}));});
test('すべての業種の提案が既存サービスを参照する',()=>{for(const x of Object.values(industries))for(const id of x.ids)assert.ok(services.some(s=>s.id===id));});
