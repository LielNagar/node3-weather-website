const request=require('request')

const forecast=(lati,longi,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=a34dca72795e184feb5371dfd6c81be3&query=" +longi+","+lati
    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to the WIFI",undefined)
        }else if(body.error){
           callback("Unable to find location",undefined)
        }
        else{
            const data={
                Allforecast:body.current.weather_descriptions,
                forecast:"It is " +body.current.weather_descriptions[0]+" out there!",
                temp:body.current.temperature,
                realDeal:body.current.feelslike,
                precip:body.current.precip,
                humidity: body.current.humidity
            }
            callback(undefined,data)
        }
    })
}

module.exports=forecast