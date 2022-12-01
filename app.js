var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const http=require("http");
const db =require('./models');
const cors = require('cors');
const multer=require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categorieRouter = require('./routes/categorie');
var bonplansRouter = require('./routes/bonplans');
const eventRouter =  require('./routes/evenement');
const utilisateurRouter=require('./routes/utilisateur');
const cookieParser = require('cookie-parser');

var app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './public/images')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categorie', categorieRouter);
app.use('/bonplans', bonplansRouter);
app.use('/event',eventRouter);
app.use('/utilisateurs', utilisateurRouter);
app.use(cookieParser());
app.use(cors({
  credentials:true,
  origin:["http://localhost:3000","http://localhost:8080","http://localhost:5000","http://localhost:4200"]
}));


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
const server =http.createServer(app);
server.listen(5000,()=>console.log("bien venus"));


