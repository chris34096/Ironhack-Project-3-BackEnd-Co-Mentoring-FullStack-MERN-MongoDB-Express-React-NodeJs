const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const app = express();


//DB config
const db = require('./config/keys').mongoURI

//Routes
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile.js')
const searchRoutes = require('./routes/search')



//All Middlewares
app.use(bodyParser.json()) //for application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Passport MiddleWare
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport)


// Use Routes
app.use('/api/users',authRoutes) //Signin Signup
app.use('/api/profiles',profileRoutes)
app.use('/api/search',searchRoutes)


//Mongoose
mongoose
  .connect(db,{ useNewUrlParser: true , useFindAndModify: false })
  .then(()=> {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 3000, () => console.log('Server connected'));
  })
  .catch(err => console.log(err));