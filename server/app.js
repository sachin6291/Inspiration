require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const cors         = require("cors")
const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);

// require('./configs/mongoose.config'); 
const mongoose = require('./configs/mongoose.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup


app.use(express.static(path.join(__dirname, 'public')));



// default value for title local
app.locals.title = 'error!!!! Default page not for your project';


// Enable authentication using session + passport
app.use(session({
  secret: 'uno33cincocincocincocinco',
  resave: true,
  saveUninitialized: true,
  //La sigurnte linea guarda la seccion
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))

// configuracion middleware CORS
const whitelist = ['http://localhost:5000']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin);
    cb(null, originIsWhitelisted)
  },
  credentials: true
}
app.use(cors(corsOptions))

require('./configs/passport.config')(app);


// const inspirationRoutes = require('./routes/coaster.routes')
// app.use('/api', inspirationRoutes)

const projectRoutes = require("./routes/project.routes")
app.use("/api", projectRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes)
      

module.exports = app;
