var express = require('express');
const car_controlers = require('../controllers/car');
var router = express.Router();

const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}

/* GET cars */
router.get('/', car_controlers.car_view_all_Page);

//For details of car
router.get('/detail', car_controlers.car_view_one_Page);


//For Crete
router.get('/create', car_controlers.car_create_Page);


//For Update
router.get('/update', secured, car_controlers.car_update_Page);

//For Delete
router.get('/delete', car_controlers.car_delete_Page);

module.exports = router;