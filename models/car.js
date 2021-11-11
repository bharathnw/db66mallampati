const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
    name: String,
    color: String,
    cost: Number
});

module.exports = mongoose.model("Car", carSchema);