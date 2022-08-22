const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geoCode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app= express()
//Path for express
const publicPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//Set up for the app (engine and views location)
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up default directory
app.use(express.static(publicPath))

//GET methods
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather APP',
        name: 'Liel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About APP',
        name: 'Liel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help APP',
        name:'Liel',
        help: 'In Hogwarts help will be have to those who ask for!'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address term"
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecastData,
                location
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:'Liel Nagar',
        message:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:'Liel Nagar',
        message:"page not found"
    })
})
//End of GET methods

app.listen(3000,()=>{
    console.log("Running")
})