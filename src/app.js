const express=require('express')
const path = require('path')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title :'weather  App',
        name :'Aimable'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'THIS IS SOME HELPFUL TEST ',
        title:'help',
        name:'aima'
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About KK me',
        name :'kayiranga'
    })
})




app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'it is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'kaka',
        errorMessage:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Kayiaiamble',
        errorMessage:'Page not found'
    })
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})