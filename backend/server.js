const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const knex = require('knex');
const db = require('./util/database');

const root = require('./controllers/root');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const celebrityRecords = require('./controllers/celebrityRecords');
const colorRecords = require('./controllers/colorRecords');

const saveHtml = require('./controllers/saveHtml');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const rootDir = require('./util/path');
require('dotenv').config({ path: `${rootDir}/.env`});

const printDateTime = require('./util/printDateTime').printDateTime;
const saveBase64Image = require('./util/saveBase64Image');

const transformColorData = require('./util/records-data-transformations/transformColorData');

// Middleware 
// 1. Requests Logging
const logger = require('./middleware/requestLogger');

// 2. Test PostgreSQL connection
const { testDbConnection } = require('./middleware/testDbConnection');
testDbConnection(db);

console.log(`\n\nprocess.env.POSTGRES_HOST:\n${process.env.POSTGRES_HOST}\n\nprocess.env.POSTGRES_USER:\n${process.env.POSTGRES_USERNAME}\n\nprocess.env.POSTGRES_PASSWORD:\n${process.env.POSTGRES_PASSWORD}\n\n\nprocess.env.POSTGRES_DB:\n${process.env.POSTGRES_DB}\n\n\nprocess.env.POSTGRES_PORT:\n${process.env.POSTGRES_PORT}\n\nprocess.env.NODE_ENV:\n${process.env.NODE_ENV}\n`);


// Using Express middleware
const app = express(); 

app.use(bodyParser.json({ limit: '100mb' }));
/* Local dev Middleware for CORS (Cross-Origin-Resource-Sharing) */
const origin = process.env.NODE_ENV === 'production' ? `https://ai-recognition-frontend.onrender.com/` : `http://localhost:3000`
app.use(cors({ credentials: true, origin: `${origin}` }));
// app.use(cors());

// Middleware for cookie-parser and pass the secret for signing the cookies
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `secure: true` if you are using https
}))

// Will need either app.use(express.json()) || app.use(bodyParser.json()) to parse json 
app.use(express.json()); 

// ** Express Middleware for Logging HTTP Requests **
app.use(logger);

/* Express routes */
// Session cookies
app.get('/api/get-user-data', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: `Not authenticated` });
    }
});

// create a basic route for root
app.get('/', (req, res) => { root.handleRoot(req, res, db) } );

// create /signin route
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) } );

// create /register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } );

// create /profile/:id route
// grab via req..params props
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) } );

// create /image
// increase entries
app.put('/image', (req, res) => { image.handleImage(req, res, db) } );
app.post('/celebrityimage', (req, res) => { image.handleCelebrityApi(req, res, fetch) } );
app.post('/colorimage', (req, res) => { image.handleColorApi(req, res, fetch) } );
app.post('/ageimage', (req, res) => { image.handleAgeApi(req, res, fetch) } );

// User's color records
app.post('/save-user-color', (req, res) => {colorRecords.saveUserColor(req, res, db, saveBase64Image) } );
app.post('/get-user-color', (req, res) => { colorRecords.getUserColor(req, res, db, transformColorData) });

// User's celebrity records
app.post('/save-user-celebrity', (req, res) => { celebrityRecords.saveUserCelebrity(req, res, db, saveBase64Image)});
app.post('/get-user-celebrity', (req, res) => { celebrityRecords.getUserCelebrity(req, res, db)});

// For Users to download records to .pdf files to their devices
app.post('/save-html', async(req, res) => { saveHtml.saveHtml(req, res, puppeteer) });

// app.listen(port, fn)
// fn will run right after listening to a port
const port = process.env.PORT || 3001;

// const DATABASE_URL = process.env.DATABASE_URL
app.listen(port, () => {
    printDateTime();

    console.log(`\nNode app is up & running on port: ${port}\n`);
})
