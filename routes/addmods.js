const e = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let query = req.query;
    if (!Number.isInteger(parseInt(query.rows)) || !Number.isInteger(parseInt(query.cols))) {
        res.send('Please pass valid query params to execute');
    } else if (parseInt(query.rows) == 0 || parseInt(query.cols) == 0) {
        res.send('0 cannot be used to generate a table');
    } else {
        res.render('addmods', { title: 'Add Mods', query: query });
    }
});

module.exports = router;