const redis = require("redis");

const redisHost = process.env.REDIS_HOST || "localhost";

// Create a Redis client
const redisClient = redis.createClient({
    url: `redis://${redisHost}:6379`,
});

redisClient.connect().catch(console.error);

redisClient.on("ready", async () => {
    console.log("Connected to Redis");

    // Add some sample data with different visit counts
    await redisClient.incrBy("us", 1200);
    await redisClient.incrBy("ua", 450);
    await redisClient.incrBy("it", 300);
    await redisClient.incrBy("fr", 150);
    await redisClient.incrBy("de", 80);
    await redisClient.incrBy("es", 35);
    await redisClient.incrBy("ca", 15);
    await redisClient.incrBy("br", 5);
    await redisClient.incrBy("au", 0);

    console.log("Data has been seeded");
    redisClient.quit();
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});
