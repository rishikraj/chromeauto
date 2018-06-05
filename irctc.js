const puppeteer = require('puppeteer');
var request = require("request");
(async () => {
  const browser = await puppeteer.launch({headless: false,
  args: ['--disable-infobars']})
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://www.irctc.co.in/nget/')
  await page.click('body > app-root > app-home > app-header > div.h_container > div.h_main_div > div.h_head1 > a:nth-child(2)')
  await page.waitForSelector('#login_header_disable > div > div.ui-dialog-content.ui-widget-content > app-login > div.irmodal > div > div > div.modal-content > div.modal-body > form > div:nth-child(3) > div > app-captcha > div > div > div > div.captcha_div > span:nth-child(1) > img')
  const image = await page.evaluate(() => document.querySelector('#login_header_disable > div > div.ui-dialog-content.ui-widget-content > app-login > div.irmodal > div > div > div.modal-content > div.modal-body > form > div:nth-child(3) > div > app-captcha > div > div > div > div.captcha_div > span:nth-child(1) > img').src)
  var options = { method: 'POST',
	  url: 'https://api.ocr.space/parse/image',
	  headers: 
	   { 'cache-control': 'no-cache',
	     apikey: '2a0c32dace88957',
	     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
	  formData: { base64Image: image   } };

	 await request(options, async function (error, response, body,) {
		  if (error) throw new Error(error);
		  var json = await JSON.parse(body);
		  var captcha = await json.ParsedResults[0].ParsedText.replace(/(\r\n\t|\n|\r\t)/gm,"").trim().replace(/ +/g, "");
		  await page.type('#userId', "")
		  await page.type('#pwd', "")
		  await page.type('#captcha', captcha)
		});
   await page.click('#login_header_disable > div > div.ui-dialog-content.ui-widget-content > app-login > div.irmodal > div > div > div.modal-content > div.modal-body > form > button')
})()
