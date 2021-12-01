const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    color: {
        type: String,
        minLength: 3
    },
    cost: {
        type: Number,
        min: 3
    }
});

module.exports = mongoose.model("Car", carSchema);