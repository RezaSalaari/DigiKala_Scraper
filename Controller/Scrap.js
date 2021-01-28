const puppeteer = require('puppeteer');
exports.Scrap = async(searchword)=>

 { const browser = await puppeteer.launch()
        var resmessage=[]
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
    
        await page.goto(`https://www.digikala.com/search/?q=${searchword}`, {waitUntil: 'networkidle2'});
       const divcount= await page.$$eval('ul > li > div.c-product-box', divs =>divs.map(x=>x.getAttribute('data-enhanced-ecommerce'),{waitUntil:'load', timeout:0}))
    
          await  divcount.forEach((item)=>{
                resmessage.push({
                    name:JSON.parse(item).name,
                    Brand : JSON.parse(item).brand,
                    Price : JSON.parse(item).price
                })
            })
            
        
    
        return resmessage
        
        }
    
