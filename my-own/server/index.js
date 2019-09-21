const keys = require('./keys');

// Express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');       // to make requests from one domain to a different domain (actually different port)

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 8-110 Connecting to Postgres
// declare and connect to running Postgres server (using environment variable and keys defined)
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));  // let us know if there's trubba

// ensure we can store all indices which have been (Postgres's only job here) in table 'values' with column 'number'
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => console.log(err));

// Redis client setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,           // get connection for redis from environment variables via keys object
    port: keys.redisPort,
    retry_strategy: () => 1000      // if connection lost, attempt retry once every 1000 ms (ie once every second)
});
const redisPublisher = redisClient.duplicate(); 
// connection can/must not be used for other purposes - hence duplicate for listener

// Express route handlers ///

/// basic test route
app.get('/', (request, response) => {
    // NB standard signature is (req,res
    response.send('Hello!');
});

/// retrieve all previously calculated values, from Postgres
app.get('/values/all', async (request, response) => 
{       // NB standard signature is (req,res)
    const values = await pgClient.query('SELECT * from values');        // NB async/await

    response.send(values.rows);     // send back only query result data, not query itself or how many rows involved
});

/// find all previously submitted fib index values (from Redis)
app.get('/values/current', async(request, response) => {
    redisClient.hgetall('vaues', (err, values) => {       // hget - hash get - in this case hash is 'values'
       response.send(values);      // no promise support for Redis, hence no async/await; must use this callback
    });
});

/// user submitting an index value for fibonacci sequence calculation
app.post('/values', async (req, res) => {
    // Do not calculate more than an index of 40, as this would take a very long time!
    const index = req.body.index;

    if (parseInt(index) > 40)
    {
        return res.status(422).send('Index too high - max 40');         // unprocessable entity
    }

    redisClient.hset('values', index, 'Nothing for this value yet!');   // placeholder string to be overwritten if value actually found; hset - hash set for 'values'
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ working: true});       // fairly arbitrary status flag to return
});

/// listen to port 5000 - log if a request received on that port
app.listen(5000, err => {
    console.log('Listening...');
});