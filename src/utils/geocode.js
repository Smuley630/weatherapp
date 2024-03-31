const request =require('request')
const geocode =(adress, callback)=>{
     console.log("llllllllllll",adress)
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+adress+".json?access_token=pk.eyJ1Ijoic211bGV5MTIiLCJhIjoiY2x1M3hmMjFyMTB1djJxcGQ1cDlhNWVkaiJ9.ZLTbm-J-g0RO_lOiLXy1pA&limit=1"
    request({url,json:true},(error,{body})=>{
       
   if(error){
    callback('something went wrong',undefined)
   }
   else if(body.features.length===0){
     callback('unable to find location',undefined)
     return
   }else{
     console.log(".....inside")
   callback(undefined,{
       
        lat: body.features[0].center[1],
        long : body.features[0].center[0],
        location:body.features[0].place_name
   })}
   })
   }

   module.exports =geocode;