module.exports = {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
}   // an object with redisHost & redisPort, used from Worker/index.js
// will query environment variables for REDIS_HOST & REDIS_PORT - must configure these later! 8-108 Worker setup