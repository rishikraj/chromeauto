// Developed by Ashutosh Gupta.
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.goto('https://erp.iitkgp.ernet.in/SSOAdministration/login.htm?sessionToken=1B01BBF2B569BD0859F85B9C2ADA940C.worker2&requestedUrl=https://erp.iitkgp.ernet.in/IIT_ERP3/')
  await page.type('#user_id', '16AG30007')
  await page.type('#password', 'IIT@kharagpur')
  const name = await page.evaluate(() => document.querySelector('#question').innerText)
  var answer;
  switch(name) {
  	case 'first mobile':
  		answer = 'samsung';
  		break;
	case 'first cycle':
  		answer = 'avon';
  		break;
  	case 'first username':
  		answer = 'handksome';
  		break;  	
  }
  await page.type('#answer', answer)
  await page.click('#signin > div > div > div > div > form > fieldset > div.row > div > input.btn.btn-primary')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  await page.click('#skiplink')
  await page.goto('https://erp.iitkgp.ernet.in/IIT_ERP3/menulist.htm?module_id=16')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  await page.click('#accordion > div:nth-child(11) > div.panel-heading.accordion-toggle.collapsed')
  const head = await page.evaluate(() => document.querySelector('#collapse163 > div > div:nth-child(11) > a.text-default').innerText)
  await page.click('#collapse163 > div > div:nth-child(11) > a.text-default')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })

  
})()