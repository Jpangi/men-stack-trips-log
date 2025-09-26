
const mongoose = require("mongoose");


const activitySchema = new mongoose.Schema({
    description: String,
    activityDate: Date,
});

const tripSchema = new mongoose.Schema({
    name: String,
    date: Date,
    status: {
        type: String,
        enum: ['planned', 'ongoing', 'completed']
    },
    activities: [activitySchema]
});

const Trip = mongoose.model("Trip", tripSchema); // create model

module.exports = Trip;