const redis = require("redis");

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || "6379";

// Create a Redis client
const redisClient = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`,
});

redisClient.connect().catch(console.error);

redisClient.on("ready", () => {
    console.log(`Connected to Redis at ${redisHost}:${redisPort}`);
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

// Method to get statistics from Redis
const getStatistics = async () => {
    const keys = await redisClient.keys("*");
    const stats = {};

    for (const key of keys) {
        const count = await redisClient.get(key);
        stats[key] = parseInt(count, 10);
    }

    return stats;
};

// Method to increment statistics in Redis
const incrementStatistics = async (countryCode) => {
    await redisClient.incr(countryCode);
};

module.exports = {
    getStatistics,
    incrementStatistics,
    redisClient,
};
