
exports.SplitMessage = async(data)=>{

    var message =JSON.parse( data.Message)
   
    var obj=JSON.parse(message[0][0][0])
    
        return obj
}

                                                                                          
exports.trim=async(str)=>{
    let name = str.name
    let price =str.Price
    let Brand = str.Brand
    try {
        let response = `اسم محصول : ${name} \n\قیمت :${price}\n برند:${Brand}`
        return response
    } catch (error) {
        console.log(error)
    }
    
   }

   


     
        
       
     
   
        
    
    


