const redis = require("redis");

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || "6379";
const redisDb = process.env.REDIS_DB || "0";

let redisClient;
let isInitialized = false;

const init = async () => {
    if (isInitialized) {
        console.log("Redis is already initialized.");
        return redisClient;
    }

    redisClient = redis.createClient({
        url: `redis://${redisHost}:${redisPort}/${redisDb}`,
    });

    try {
        await redisClient.connect();
        console.log(`Connected to Redis at ${redisHost}:${redisPort}, DB: ${redisDb}`);
        isInitialized = true;
        return redisClient;
    } catch (err) {
        console.error("Redis connection error:", err);
        throw err;
    }
};

const flushDb = async () => {
    if (redisClient && isInitialized) {
        await redisClient.flushDb();
        console.log("Redis database flushed.");
    } else {
        throw new Error("Redis client is not initialized");
    }
};

const quit = async () => {
    if (redisClient && isInitialized) {
        await redisClient.quit();
        console.log("Redis connection closed.");
        isInitialized = false;
    } else {
        throw new Error("Redis client is not initialized or already closed");
    }
};

const getStatistics = async () => {
    if (!redisClient || !isInitialized) {
        throw new Error("Redis client is not initialized");
    }

    const keys = await redisClient.keys("*");
    const stats = {};

    for (const key of keys) {
        const count = await redisClient.get(key);
        stats[key] = parseInt(count, 10);
    }

    return stats;
};

const incrementStatistics = async (countryCode) => {
    if (!redisClient || !isInitialized) {
        throw new Error("Redis client is not initialized");
    }

    await redisClient.incr(countryCode);
};

module.exports = {
    init,
    flushDb,
    quit,
    getStatistics,
    incrementStatistics,
    redisClient,
};
