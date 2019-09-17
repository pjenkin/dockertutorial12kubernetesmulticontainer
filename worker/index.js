const keys = require('./keys');     // keys for Redis records 8-108 Worker setup
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,           // get connection for redis from environment variables via keys object
    port: keys.redisPort,
    retry_strategy: () => 1000      // if connection lost, attempt retry once every 1000 ms (ie once every second)
});

const sub = redisClient.duplicate();        // subscription to Redis client

/// calculate fibonacci sequence value 
function fib(index) 
{
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);     // classic recursive fibonacci value calculation https://medium.com/launch-school/recursive-fibonnaci-method-explained-d82215c5498e
    // NB recursion quite slow, hence a good reason (ish) for a separate container for the worker process
}

// watch via subscription for a value from the form
sub.on('message',  (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)))
});

sub.subscribe('insert');    // define this subscription type - any time (index) value inserted to Redis, try to caculate fib value and then return