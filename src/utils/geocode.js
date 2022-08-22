const request=require('request')

const geoCode=(address,callback)=>{
    const geoCodeURL= "http://api.positionstack.com/v1/forward?access_key=e3bd10b741949f0eaf539ba75f9d9175&query="+address
    request({url:geoCodeURL,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to the WIFI",undefined)
        }else if(body.error){
            callback(body.error.code + ", " + body.error.message+": "+body.error.context.query.message,undefined)
        }else if(body.data.length==0) callback("Unable to find location",undefined)
        else{
            const data ={
                longitude:body.data[0].longitude,
                latitude:body.data[0].latitude,
                location:address
            }
            callback(undefined,data)
        }
    })
}

module.exports= geoCode