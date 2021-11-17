var car = require('../models/car');


// for a specific car. 
exports.car_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: car detail: ' + req.params.id);
};


exports.car_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await car.findByIdAndDelete(req.params.id)
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
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


exports.car_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await car.findById(req.query.id)
        res.render('cardetail', { title: 'Car Detail', toShow: result });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


exports.car_update_Page = async function(req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await car.findById(req.query.id)
        res.render('carupdate', { title: 'Car Update', toShow: result });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};



exports.car_create_Page = function(req, res) {
    console.log("create view")
    try {
        res.render('carcreate', { title: 'Car Create' });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
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

// for a specific Costume. 
exports.car_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await car.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

exports.car_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await car.findById(req.params.id)
            // Do updates of properties 
        if (req.body.name)
            toUpdate.name = req.body.name;
        if (req.body.color) toUpdate.color = req.body.color;
        if (req.body.cost) toUpdate.cost = req.body.cost;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`);
    }
};

exports.car_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await car.findById(req.query.id)
        res.render('cardelete', {
            title: 'Car Delete',
            toShow: result
        });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};