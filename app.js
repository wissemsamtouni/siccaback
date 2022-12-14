var createError = require('http-errors');
var express = require('express');

var path = require('path');
var logger = require('morgan');
const http=require("http");
const db =require('./models');
db.sequelize.options.logging = false;
const multer=require('multer');
const cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const materielRouter=require('./routes/materiel');
const promoRouter=require('./routes/promo');
var categorieRouter = require('./routes/categorie');
var bonplansRouter = require('./routes/bonplans');
const eventRouter =  require('./routes/evenement');
const utilisateurRouter=require('./routes/utilisateur')
//const reserRouter =  require('./routes/reservation');
const reservationRouter =  require('./routes/reservation');
const panierRouter =  require('./routes/panier');
const shedule = require('node-schedule');
const { use } = require('./routes/index');
var cors = require('cors');
const bodyparser = require('body-parser')

var app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const stripe = require("stripe")("sk_test_51MDASDLtBuFc9f6IcbpcBmHigR1LiuffNI5tVBNKM7Nt8Gv0HUdPNMPK7YY8b6K5wniys87T6pRHOqfrB4jEi7W800vnmuDPbU");


app.use(cors ({
    origin: ['http://localhost:4200', 'http://localhost:5000'],
    credentials: true,

}));

db.sequelize
  .sync({forse:true})
  // .sync()
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

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/bonplans', bonplansRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categorie', categorieRouter);
app.use('/panier', panierRouter);
app.use('/reservation', reservationRouter);
app.use('/event',eventRouter);
app.use('/utilisateurs', utilisateurRouter);
app.post('/checkout', async(req, res) => {
  try {
      console.log(req.body);
      token = req.body.token
      console.log(token);
    const customer = stripe.customers
      .create({
        email: "maryemzoughlami@gmail.com",
        source: token.id
      })
      .then((customer) => {
        console.log(customer);
        return stripe.charges.create({
          amount: 1000,
          description: "Test Purchase using express and Node",
          currency: "USD",
          customer: customer.id,
        });
      })
      .then((charge) => {
        console.log(charge);
          res.json({
            data:"success"
        })
      })
      .catch((err) => {
          res.json({
            data: "failure",
          err});
      });
    return true;
  } catch (error) {
    return false;
  }
})
app.use('/materiel', materielRouter);
app.use('/promo', promoRouter);
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
const myDailyTask = async () => {
  // how recupere user by data and delete this user 
   const users = await db.evenement.findAll();
   users.forEach(async (evenement) => {
     var someDate = new Date();
     someDate.setDate(someDate.getDate());
     var dateFormated = someDate.toISOString().substr(0,10);
     if (evenement.datefin < dateFormated) {
       await db.evenement.destroy({
         where: {
          
           id: evenement.id,
         },
       });

       await db.reservation.destroy({
        where: {
         
          EvenementId: evenement.id,
        },
      });

     }
   });
 
 };
 
 shedule.scheduleJob('*/2 * * * * * ', () => { 
   myDailyTask();
 });
 

const server =http.createServer(app);
server.listen(5000,()=>console.log("bien venus"));


