/*--------IMPORTS--------*/

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
const app = express();

/*--------MIDDLEWARE--------*/
app.use(express.urlencoded({extended: false}))

/*--------CONNECTIONS--------*/
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", ()=>{
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
})

const Trip = require('./models/trip')

/*--------ROUTES--------*/


app.get('/', (req,res)=>{
    res.render("index.ejs")
})

app.get('/trips', async (req,res)=>{
    const allTrips = await Trip.find();
    res.render('./trips/index.ejs', {trips: allTrips})
})

app.get('/trips/new', (req,res)=>{
    res.render('trips/new.ejs')
})

app.post('/trips', async(req,res)=>{
    await Trip.create(req.body)
    res.redirect('/trips')
})

app.get('/trips/:tripId', async (req,res)=>{
    const foundTrip = await Trip.findById(req.params.tripId)
    console.log('SHOW PAGE', foundTrip);
    res.render('trips/show.ejs', {trip: foundTrip})
})

const PORT = process.env.PORT
app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT ${PORT}`);
})