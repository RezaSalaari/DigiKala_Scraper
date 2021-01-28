const TelegramBot = require('node-telegram-bot-api')
const token = '1581360694:AAHLNzzczP0J8UcROUtsl_3VdVrK-1XaHRU'
const bot = new TelegramBot(token,{polling:true})
var redis = require("redis");
const jwt = require('jsonwebtoken')
const puppeteer = require('puppeteer');
const { format } = require('path');
const opt = require('./option.js')
const client = redis.createClient();
const mongoose =require('mongoose')
const config = require('./Config/DataBase')
const Model_User = require('./http/Model/Model_Users');
const Model_reminder =require('./http/Model/Model_reimnderSite')
const { brotliCompress } = require('zlib');
const { SplitMessage, trim } = require('./UtilsFunction.js');
const { Socket } = require('dgram');
const Io = require('socket.io-client')
ioClient = Io.connect("http://localhost:3000");


client.on("connect", function() {
    console.log("You are now connected");
  });

var saveSearch=[]
mongoose.connect(config.Mongo.url_mongo,config.Mongo.option).then(res=>{
    console.log('Connect To DataBase')
}).catch(err=>{
    console.log(err)
})



bot.onText(/\/start/,async msg=>
    {

    var options = {
       
        "parse_mode": "Markdown",
        "reply_markup": {
        "resize_keyboard":true,
        "selectie":true,
        "one_time_keyboard":true,

            "keyboard": [
                
                [{ text: "Contact", request_contact: true}]
            ]
        }
    };

    bot.sendMessage(msg.chat.id, "سلام به شمارش گر دیجی کالا خوش اومدید برای ادامه مراحل دکمه ثبت نام رو بزنید",options)


    bot.on('message',(msg) =>{
        
       
        let Phone = msg.contact.phone_number
        let CreateToken =jwt.sign(Phone,'123abc')
      const token = client.hmset("token", { id:msg.chat.id, token : CreateToken });
        if(token )
        {
                bot.sendMessage(msg.chat.id , " ثبت نام شما با موفقیت انجام شد",
                {
                    "reply_markup":{
                        "resize_keyboard":true,
                        "keyboard":[
                            [{text:"Search"}],
                            [{text:"لیست یاد آوری های ذخیره شده"}],
                            [{text : "ایجاد رویداد تخفیف"}]
    
                        ]
                    }
                })
    
                
        }  
    
    })

    })



bot.onText(/Search/gi,async (msg)=>
{
    

    var searchword
   bot.sendMessage(msg.chat.id , "لطفا محصول مورد نظر خود را وارد نمایید ")
  await   bot.on('message',async(resp)=>{
        var word = resp.text
        searchword=word
       
     await    bot.sendMessage(resp.chat.id,"در حال پیدا کردن محصول ..")
        
var scrap =async (cb)=>{ const browser = await puppeteer.launch()
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

    scrap().then((item)=>{
      
        let order=[]
        var responese =[]
        item.forEach((x)=>{
          order.push(JSON.stringify(x))
        })
        
       responese.push(order.slice(0,4)) 
       saveSearch.push(responese)
       bot.sendMessage(resp.chat.id, `${responese}`,
     {
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Next Page ",
                        callback_data: "next",
                    }, {
                        text: "❤️",
                        callback_data: "fav",
                    },
                ],
            ],
        },
    });

   
    });
       
    }) 
  
    
})
const editMSGREP= async(...data)=>{
    await bot.editMessageText(data[0],{
        chat_id : data[1],
        message_id:data[2],
        reply_markup:data[3]
    })
}


bot.on("callback_query", async (callbackQuery) => {
    const msg = callbackQuery.message;
	const chatId = msg.chat.id;
    const userid = callbackQuery.id
    let responesSearch =saveSearch[0][0][0]
	await bot.sendChatAction(chatId, 'typing');
    await bot.answerCallbackQuery(callbackQuery.id)
    
    switch(callbackQuery.data)
    {
		case 'fav':
            await editMSGREP('اضافه شد به علاقه مندی های شما ',chatId, msg.message_id, opt[0].reply_markup);
            
            await  Model_User.userSaveMethod({
                id : userid,
                Message :responesSearch
            })
            
             break;
        
    }
})



bot.onText(/لیست یاد آوری های ذخیره شده/gi,async (msg)=>{
   
     
    let idchat = msg.chat.id
    let find =  await Model_User.findSearch(idchat)
    // console.log(find)
    let resp= {
        name:find.name,
        price:find.price,
        Brand : find.Brand
    }
    let split = await SplitMessage((find))
    let trimMessage = await trim((split))
    
    bot.sendMessage(idchat , `${trimMessage}`)

    });


   
bot.onText(/ایجاد رویداد تخفیف/gi,async(msg)=>{
    bot.sendMessage(msg.chat.id , " لطفا میزان مبلغ تخفیف خود را بصورت اعداد لاتین وارد نموده")
    bot.on('message',(takhfif)=>{
        infoRemind.push({
            takhfif: takhfif
        })

        bot.sendMessage(msg.chat.id , " لطفا ادرس صفحه مدنظر خود را وارد نمایید ")
        bot.on('message',async(url)=>{
            infoRemind.push({
                url: url
            })
            await   Model_reminder.userSaveMethod({
                info : infoRemind
            })
    })
   
   
    })
  

        ioClient.on("discount",(res)=>{
            console.log(res)
            bot.sendMessage(msg.chat.id ,res+ " تبریک میگم به تخفیف مدنظرتون رسیدیم ")
        })
})



var infoRemind = []
module.exports={
infoRemind
}