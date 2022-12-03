var createError = require('http-errors');
var express = require('express');

var path = require('path');
var logger = require('morgan');
const http=require("http");
const db =require('./models');

const cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categorieRouter = require('./routes/categorie');
const eventRouter =  require('./routes/evenement');
const utilisateurRouter=require('./routes/utilisateur')
//const reserRouter =  require('./routes/reservation');
const reservationRouter =  require('./routes/reservation');
const panierRouter =  require('./routes/panier');
const { use } = require('./routes/index');
var cors = require('cors');
var app = express();
app.use(cors ({
    origin: ['http://localhost:4200', 'http://localhost:5000'],
    credentials: true,

}));

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categorie', categorieRouter);
//app.use('/reservation', reserRouter);
app.use('/panier', panierRouter);
app.use('/reservation', reservationRouter);
app.use('/event',eventRouter);
app.use('/utilisateurs', utilisateurRouter);


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
res.json({error:err})
});
const server =http.createServer(app);
server.listen(5000,()=>console.log("bien venus"));


