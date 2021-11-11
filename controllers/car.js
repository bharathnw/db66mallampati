var car = require('../models/car');


// for a specific car. 
exports.car_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: car detail: ' + req.params.id);
};


// Handle car delete form on DELETE. 
exports.car_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: car delete DELETE ' + req.params.id);
};

// Handle car update form on PUT. 
exports.car_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: car update PUT' + req.params.id);
};

//List of all cars 
exports.cars_list = async function(req, res) {
    try {
        theCars = await car.find();
        res.send(theCars);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.car_view_all_Page = async function(req, res) {
    try {
        thecars = await car.find();
        res.render('car', { title: 'Car Search Results', results: thecars });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.car_create_post = async function(req, res) {
    let document = new car();
    document.name = req.body.name;
    document.cost = req.body.cost;
    document.color = req.body.color;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};