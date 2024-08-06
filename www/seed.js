const redis = require("redis");

// Create a Redis client
const redisClient = redis.createClient({
    url: "redis://localhost:6379",
});

redisClient.connect().catch(console.error);

redisClient.on("ready", async () => {
    console.log("Connected to Redis");

    // Add some sample data
    await redisClient.incrBy("us", 456);
    await redisClient.incrBy("ua", 124);
    await redisClient.incrBy("it", 79);
    await redisClient.incrBy("fr", 91);
    await redisClient.incrBy("de", 135);

    console.log("Data has been seeded");
    redisClient.quit();
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});
