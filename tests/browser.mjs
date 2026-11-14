import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173');await page.getByRole('heading',{level:1}).waitFor();
 assert.equal(await page.locator('.service-card').count(),6);
 await page.getByRole('button',{name:'補償',exact:true}).click();assert.equal(await page.locator('.service-card').count(),2);
 await page.locator('.service-card summary').first().click();assert.ok(await page.locator('details[open]').count());
 await page.locator('#industry').selectOption('小売・飲食');assert.match(await page.locator('#industry-result').innerText(),/お店の成長/);
 for(const [key,value] of Object.entries({trips:'12',perTrip:'3000',hours:'2',hourly:'5000',fee:'100000'}))await page.locator(`[name=${key}]`).fill(value);
 assert.equal(await page.locator('#total').innerText(),'￥156,000');assert.equal(await page.locator('#net').innerText(),'￥56,000');
 await page.locator('#present').click();for(let i=0;i<3;i++)await page.locator('#next').click();assert.match(await page.locator('#slide-body').innerText(),/156,000/);
 await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#slide-count').innerText(),'05 / 05');await page.keyboard.press('Escape');assert.equal(await page.locator('#presentation').evaluate(d=>d.open),false);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
 await page.getByRole('button',{name:'リセット'}).click();await page.waitForTimeout(50);assert.equal(await page.locator('#total').innerText(),'￥0');
 await page.screenshot({path:`/tmp/platinum-${width}.png`,fullPage:true});await page.reload();assert.equal(await page.locator('[name=trips]').inputValue(),'0');assert.deepEqual(errors,[]);await page.close();console.log(`PASS browser ${width}px: filters, industry, calculation, slides, reset, privacy, layout`);
}
}finally{await browser.close();}
