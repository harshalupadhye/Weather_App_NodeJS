const request = require("postman-request")

const temperature=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=30c1b4a999d9668d7b283cf738746865&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
    request({url:url,json:true},(error,res)=>{
        callback(error,res)
    })
}
module.exports=temperature