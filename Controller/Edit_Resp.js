exports.editMSGREP= async(...data)=>{
    await bot.editMessageText(data[0],{
        chat_id : data[1],
        message_id:data[2],
        reply_markup:data[3]
    })
}
