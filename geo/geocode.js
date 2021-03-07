const request = require("postman-request")


const geocode=(address,callback)=>{
    console.log(address)
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFyc2hhbHVwYWRoeWUiLCJhIjoiY2tsN3dyd3h0MGs2cTJ3bnBhZG1laW9lNiJ9.TdHvy_JGWGBsrHv-P52oeQ'
    request({url:url,json:true},(error,res)=>{
        
        callback(error,res)
    })
}
module.exports=geocode;
