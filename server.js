const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-owbdv.mongodb.net/${
  process.env.MONGO_DEFAULT_DATABASE
}?retryWrites=true`;
const app = express();


//Routes
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile.js')
const searchRoutes = require('./routes/search')
const connectRoutes = require ('./routes/connect.js')




//All Middlewares
app.use((req, res, next) => {
  if (req.path === "/favicon.ico") {
    console.log("Favicon blocked...");
    return res.json(
      "Blocking favicon to not create more sessions... Implement code for handling favicons."
    );
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
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
app.use('/api/connect',connectRoutes)





//Mongoose
  mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true,useFindAndModify: false })
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log("err");
  });

