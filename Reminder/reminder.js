const { Socket } = require('dgram');
const puppeteer = require('puppeteer')
const PN = require("persian-number");
const server = require('http').createServer();
var io = require('socket.io')(server);
var schedule = require('node-schedule')
const Model_reminder = require('../http/Model/Model_reimnderSite')
server.listen(3000);

var test = require('./../bot')




io.on('connection',(Socket)=>{ // ایجاد سوکت و کرون جاب برای تست کردن هر یک دقیقه مقدار تخفیف سایت 
 

    var j = schedule.scheduleJob('58 * * * * *', function(){
       ( async(url,discount)=>{ const browser = await puppeteer.launch()
            
            var url ='https://www.digikala.com/product/dkp-3043866/%D9%85%D8%AD%D8%A7%D9%81%D8%B8-%D8%B5%D9%81%D8%AD%D9%87-%D9%86%D9%85%D8%A7%DB%8C%D8%B4-%D9%85%D8%A7%D8%AA-%DA%98%D9%86%D8%B1%D8%A7%D9%84-%D9%85%D8%AF%D9%84-lkfcm-%D9%85%D9%86%D8%A7%D8%B3%D8%A8-%D8%A8%D8%B1%D8%A7%DB%8C-%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B4%DB%8C%D8%A7%D8%A6%D9%88%D9%85%DB%8C-redmi-note-8'
            var discount =75
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto(url, {waitUntil: 'networkidle2'});
           const elemtext= await page.$eval("#content > div > div > article > section.c-product__info > div.c-product__attributes.js-product-attributes.u-relative > div.c-product__summary.js-product-summary > div > div.c-product__seller-info.js-seller-info > div.js-seller-info-changable.c-product__seller-box > div.c-product__seller-row.c-product__seller-row--price > div.c-product__seller-price-info > div.c-product__seller-price-off.js-discount-value", el => el.textContent);
           let pak = elemtext.replace(/[`~!@#$%^&*()_|+\-=?;:'"٪,.<>\{\}\[\]\\\/]/gi, '')
           let correctRes= PN.convertPeToEn(pak)
            if(correctRes ==discount){
                console.log(correctRes)
           Socket.emit('discount' , correctRes + url )   // ایجاد رویداد برای تخفیفی که به حد نصاب ما رسیده است 
           
            }     
    })()
    
    
})
 
})



