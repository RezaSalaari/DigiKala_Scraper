
module.exports = [{
	"reply_markup": {
		"inline_keyboard": [
			[
				{
					text: "بازگشت به خانه  ",
					callback_data: "Backhome",
                
                   }
			],
					
		]
	}
},
{
       
	"parse_mode": "Markdown",
	"reply_markup": {
	"resize_keyboard":true,
	"selectie":true,
	"one_time_keyboard":true,

		"keyboard": [
			
			[{ text: "Contact", request_contact: true}]
		]
	}
},
{
	"reply_markup":{
		"resize_keyboard":true,
		"keyboard":[
			[{text:"Search"}],
			[{text:"لیست یاد آوری های ذخیره شده"}]
			

		]
	}
},
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
}
]