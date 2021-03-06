const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: ' Weather App',
        name: 'Saad Maan'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Saad Maan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Saad Maan',
        message: 'Nobody can help you now'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'Address not provided'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error)
            return res.send({
                error
            })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (req.query.search===undefined) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//Help page 404
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        error: 'Help article not found',
        name: 'Saad Maan'
    })
})

//404 page
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        error:'404 Error',
        name: 'Saad Maan'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})