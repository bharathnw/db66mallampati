var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var indexRouter = require('./routes/index');
var georgiaRouter = require('./routes/georgia');
var addModsRouter = require('./routes/addmods');
var usersRouter = require('./routes/users');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var carRouter = require('./routes/car');
var Car = require("./models/car");
var app = express();

const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


//Get the default connection 
var db = mongoose.connection;
//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() {
    console.log("Connection to DB succeeded")
});


async function recreateDB() {
    // Delete everything 
    await Car.deleteMany();

    let instance1 = new
    Car({
        name: "BMW",
        color: 'Red',
        cost: 25.4
    });
    let in2 = new Car({
        name: "Audi",
        color: 'Red',
        cost: 2000
    })
    let in3 = new Car({
        name: "Honda",
        color: 'White',
        cost: 26
    });
    instance1.save(function(err, doc) {
        if (err)
            return console.error(err);
        console.log("First object saved")
    });
    in2.save(function(err, doc) {
        if (err)
            return console.error(err);
        console.log("Second object saved")
    });
    in3.save(function(err, doc) {
        if (err)
            return console.error(err);
        console.log("Third object saved")
    });
}

let reseed = true;
if (reseed) { recreateDB(); }




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(new LocalStrategy(
    function(username, password, done) {
        Account.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }))

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/georgia', georgiaRouter);
app.use('/addmods', addModsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);
app.use('/car', carRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;