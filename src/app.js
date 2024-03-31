const path =require('path')
const express=require('express')
const hbs= require('hbs')
const request =require('request')
const geocode = require('./utils/geocode')
const weatherREQ =require('./utils/weatherreport')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app = express()
const port = process.env.PORT || 3000

//define path for express configuration
const publicDirectypath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engin and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static ierectory to use
app.use(express.static(publicDirectypath))

app.get('',(req ,res)=>{
    res.render('index',{
        title:"weather app from index.hbs",
        name:"sagar",
        header:'mainpage'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me sagar',
        name:'sagar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'give lelp to ',
        name:'sagar'
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'plz provide adress'
        })
    }
    geocode(req.query.address, (error, {lat,long,location}={ }) => {
console.log("///////////",error)
const regex = /^[a-zA-Z]+$/;
let er =regex.test(req.query.address)
console.log("errrrrr",er)
if(!er){
    return res.send({ error:'plz provide proper adress'})
}
        if (error) {
            // console.log(".......",error)
            return res.send({error})
        } else {
    
            // console.log(lat,long)
            weatherREQ(lat, long, (error, op) => {
    
                if (error) {
                    return res.send({error})
                } else {
                    res.send({
                        city:location,
                        location:req.query.address,
                        weather:op
                    })
                }
            })
        }

})})


app.get('/products',(req,res)=>{
console.log("lll",req.query.search)
if(!req.query.search){
return res.send({
    error:'u must provide a serch term'
})
}
    res.send({
        products:[]
    })

})
app.get('/*/*',(req,res)=>{
    res.render('404',{
        errormsg:'page not found with advance things ',
        // name:'sagar'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormsg:'page not found ',
        // name:'sagar'
    })
})


app.listen(port,()=>{
    console.log("server running on port "+ port)
})

