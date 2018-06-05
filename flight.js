// Developed by Ashutosh Gupta.
const puppeteer = require('puppeteer');
//const Nexmo = require('nexmo')
var readline = require('readline-sync');
//const nexmo = new Nexmo({
 // apiKey: 'ae782b9b',
//  apiSecret: 'dxfj3GEkKQGa9h63'
//});
var from = readline.question("Enter the Source airport code!\n");
var to = readline.question("Enter the Destination airport code!\n");
var date = readline.question("Enter the date in 'DD-MM-YYYY' format to query the flight stats!\n");
console.log('Searching...');
(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://flights.makemytrip.com/makemytrip/search/O/O/E/1/0/0/S/V0/'+from+'_'+to+'_'+date+'?contains=false&remove=') 
  await page.click('#stops_0_dep')
  const airline= await page.evaluate(() => document.querySelector('#content > div > div.container.ng-scope > div.row > div.main.col-lg-9.col-md-9.col-sm-12.col-xs-12 > div:nth-child(5) > div > div.top_first_part.clearfix > div.col-lg-2.col-md-2.col-sm-2.col-xs-2.logo_section.padR0 > span.block.append_bottom3.clearfix > span.pull-left.airline_info_detls > span.logo_name.append_bottomSpace6.hidden-xs.visible-stb.ng-binding.ng-scope').innerText)
  const price = await page.evaluate(() => document.querySelector('#content > div > div.container.ng-scope > div.row > div.main.col-lg-9.col-md-9.col-sm-12.col-xs-12 > div:nth-child(5) > div > div.top_first_part.clearfix > div.col-lg-2.col-md-2.col-sm-2.col-xs-4.text-right.price_sectn.make_relative.pad0 > p.price_info.RobotoRegular > span.num.ng-binding').innerText)
  console.log("The cheapest direct flight is of " + airline + " worth Rs. " + price + " on the given date.");
  //const from = 'Papa';
  //const to = 917080275973;
  //const text ="The cheapest flight is of " + airline + " worth Rs. " + price + " on the given date.";
  //nexmo.message.sendSms(from, to, text);
  browser.close();
})()