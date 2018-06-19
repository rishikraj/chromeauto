const puppeteer = require('puppeteer');
var request = require("request");
var readline = require('readline-sync');
const BrowserTimeOut=300000; 
//var username = readline.question("Please enter your irctc account USERNAME\n");
//      var password = readline.question("Please enter your PASSWORD to login\n");
      var j_from ="jhs"; //readline.question("Enter the Origin(From) Station name or Code\n").toUpperCase();
      var j_to ="nzm" //readline.question("Enter the Destination Name or Code!\n").toUpperCase();
      var j_date ="19-06-2018"//readline.question("Enter the date of journey in 'DD-MM-YYYY' format!\n");
      const quota =1; //readline.question("Press '1' for Tatkaal else enter '0'\n");

///////////////////////////////////////////////////////////////////////////////////////////////////////
async function generatetab() {
  const browser = await puppeteer.launch({headless: false,args: ['--disable-infobars']})
  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(60000)
  await page.setViewport({ width: 1366, height: 768});
  login(page);
  							 }

  async function login(page){ 
  	await page.goto('https://www.irctc.co.in/nget/')
  	await page.click('body > app-root > app-home > app-header > div.h_container > div.h_main_div > div.h_head1 > a:nth-child(2)')
  	await page.waitForSelector('#login_header_disable > div > div.ui-dialog-content.ui-widget-content > app-login > div.irmodal > div > div > div.modal-content > div.modal-body > form > div:nth-child(3) > div > app-captcha > div > div > div > div.captcha_div > span:nth-child(1) > img')
  //Captcha API call
  const image = await page.evaluate(() => document.querySelector('#login_header_disable > div > div.ui-dialog-content.ui-widget-content > app-login > div.irmodal > div > div > div.modal-content > div.modal-body > form > div:nth-child(3) > div > app-captcha > div > div > div > div.captcha_div > span:nth-child(1) > img').src)
  var options = { method: 'POST',
                  url: 'https://api.ocr.space/parse/image',
                  headers: 
                { 'cache-control': 'no-cache',
                 apikey: '2a0c32dace88957',
                 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                 formData: { base64Image: image   } };
   //API request finished
   await request(options, async function (error, response, body)
    {
        if (error) throw new Error(error);
        var json = await JSON.parse(body);
        var captcha = await json.ParsedResults[0].ParsedText.replace(/(\r\n\t|\n|\r\t)/gm,"").trim().replace(/ +/g, "");
        await page.type('#userId', "rishikraj1")
        await page.type('#pwd', "Up958611", {delay:10})
        await page.type('#captcha', "")
        await page.click('#login_header_disable > div > div.ui-dialog-content.ui-widget-content > app-login > div.irmodal > div > div > div.modal-content > div.modal-body > form > button')
        
        
        
    }           );
      
      await page.waitForSelector('body > app-root > app-home > app-header > div.h_container > div.h_main_div > div.h_head1 > span.ng-star-inserted') 
      
      await journey (page ,j_from, j_to, j_date,);        //Journey planner from source to destination
      await choosetrain(page, quota);                     //Switch to tatkaal if needed
      
      
 }
 
    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////// Journey Details
       async function journey (page, j_from, j_to, j_date) 
    { 
      
      await page.type('#origin > span > input', j_from,{delay:70})
      await page.keyboard.press('Enter')
      await page.type('#destination > span > input',j_to,{delay:70})
      await page.keyboard.press('Enter')   
      await page.waitForSelector('#divMain > div > app-main-page > div:nth-child(2) > div > div.row > div > div > div.col-xs-12 > div > app-jp-input > div:nth-child(4) > form > div.form-group.col-lg-12.col-md-12.col-sm-12.ui-float-label > p-calendar > span > input')
      await page.click('#divMain > div > app-main-page > div:nth-child(2) > div > div.row > div > div > div.col-xs-12 > div > app-jp-input > div:nth-child(4) > form > div.form-group.col-lg-12.col-md-12.col-sm-12.ui-float-label > p-calendar > span > input');
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await page.keyboard.press('Backspace');
      await page.type('#divMain > div > app-main-page > div:nth-child(2) > div > div.row > div > div > div.col-xs-12 > div > app-jp-input > div:nth-child(4) > form > div.form-group.col-lg-12.col-md-12.col-sm-12.ui-float-label > p-calendar > span > input',j_date)
      await page.keyboard.press('Enter')
      let i=0;
      while(i!=4)
        { await page.keyboard.press('Tab');
          i++;}
      await page.keyboard.press('Enter');    
      
          }   
        //////////////////////////////////////////////////////////////////////////////////////////////////////////Select train

       async function choosetrain(page, quota)
            { 
               if(quota==1){
                            await page.waitForSelector('#divMain > div > app-train-list > div.container-fluid > div > div.col-md-10.col-sm-9.col-xs-12.train-list > div.row > div.search_div.hidden-xs > div');
                            await page.click('#divMain > div > app-train-list > div.container-fluid > div > div.col-md-10.col-sm-9.col-xs-12.train-list > div.row > div.search_div.hidden-xs > div');
                            await page.keyboard.press('Tab');
                            await page.keyboard.down('Alt');
                            await page.keyboard.down('Shift');
                            await page.keyboard.press('ArrowDown');
                            await page.keyboard.up('Alt');
                            await page.keyboard.up('Shift');
                            await page.click('#divMain > div > app-train-list > div.container-fluid > div > div.col-md-10.col-sm-9.col-xs-12.train-list > div.row > div.search_div.hidden-xs > div > div.col-lg-3.col-md-5.col-sm-6.col-xs-12 > div > div.col-xs-9 > p-dropdown > div > div.ng-tns-c13-11.ui-dropdown-panel.ui-widget-content.ui-corner-all.ui-shadow.ng-trigger.ng-trigger-panelState > div > ul > li:nth-child(5) > span');
                           }
      
              




            }
 ////////////////////////////////////////////////////////////////////////////////////////Retry if OTP is mistyped    
        





     generatetab();


     
