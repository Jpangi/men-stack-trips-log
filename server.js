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

app.get('/trips/new', (req,res)=>{
    res.render('trips/new.ejs')
})

app.post('/trips', async(req,res)=>{
    await Trip.create(req.body)
    res.send('New Trip created')
})


const PORT = process.env.PORT
app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT ${PORT}`);
})