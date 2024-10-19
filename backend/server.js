const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const root = require('./controllers/root');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const records = require('./controllers/records');
const fetch = require('node-fetch');

const rootDir = require('./util/path');
require('dotenv').config({ path: `${rootDir}/.env`});

const printDateTime = require('./util/printDateTime').printDateTime;
const saveBase64Image = require('./util/saveBase64Image').saveBase64Image;

const transformColorData = require('./util/records-data-transformations/transformColorData');

// Requests Logging
const logger = require('./middleware/requestLogger');

console.log(`\n\nprocess.env.POSTGRES_HOST:\n${process.env.POSTGRES_HOST}\n\nprocess.env.POSTGRES_USER:\n${process.env.POSTGRES_USERNAME}\n\nprocess.env.POSTGRES_PASSWORD:\n${process.env.POSTGRES_PASSWORD}\n\n\nprocess.env.POSTGRES_DB:\n${process.env.POSTGRES_DB}\n\n\nprocess.env.POSTGRES_PORT:\n${process.env.POSTGRES_PORT}\n\nprocess.env.NODE_ENV:\n${process.env.NODE_ENV}\n`);

/* Docker-compose env - Connecting to PostgreSQL DB */
const db = knex({
    client: 'pg',
    connection: {
        // host: process.env.POSTGRES_SERVICENAME,
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT
    }
});

// Describing table named 'users' on our local dev server
db.select('*').from('pg_stat_activity')
.then((dbConnection) => {
    // console.log(`PostgreSQL dbConnection:\n`);
    // console.log(dbConnection);
    // console.log(`\n`);

    // Mapping connection json to display connected database name
    const databaseName = dbConnection.filter(item => item.datname === 'smart-brain');
    
    console.log(`\nConnected Database Information:\n`);
    // console.log(databaseName);
})
.catch(err => {
    console.log(`\nError verifying PostgreSQL connection:\n${err}\n`);
})

// Logging whether connection to PostgreSQL on Render.com is successful
db.raw("SELECT 1")
.then(() => {
    console.log(`\nPostgreSQL connected!!\n`);
})
.catch(err => {
    console.log(`\nPostgreSQL not connected\nErrors: ${err}\n`);
});

// Using Express middleware
const app = express(); 

// Middleware for cookie-parser and pass the secret for signing the cookies
app.use(cookieParser(process.env.MY_SECRET));

// Will need either app.use(express.json()) || app.use(bodyParser.json())
// to parse json 
app.use(express.json()); 

// Middleware for CORS (Cross-Origin-Resource-Sharing)
app.use(cors({ origin: 'http://localhost:3000' }));

// ** Express Middleware for Logging HTTP Requests **
app.use(logger);

// Express routes
// create a basic route for root
app.get('/', (req, res) => { root.handleRoot(req, res, db) } )

// create /signin route
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) } )

// create /register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } )

// create /profile/:id route
// grab via req..params props
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) } )

// create /image
// increase entries
app.put('/image', (req, res) => { image.handleImage(req, res, db) } )
app.post('/celebrityimage', (req, res) => { image.handleCelebrityApi(req, res, fetch) } )
app.post('/colorimage', (req, res) => { image.handleColorApi(req, res, fetch) } )
app.post('/ageimage', (req, res) => { image.handleAgeApi(req, res, fetch) } )

app.post('/save-user-color', (req, res) => {records.saveUserColor(req, res, db) } )
app.post('/get-user-color', (req, res) => { records.getUserColor(req, res, db, transformColorData) })

// app.listen(port, fn)
// fn will run right after listening to a port
const port = process.env.PORT || 3001;

// const DATABASE_URL = process.env.DATABASE_URL
app.listen(port, () => {
    printDateTime();

    console.log(`\nNode app is up & running on port: ${port}\n`);
})
