const { init, quit } = require("./redisClient");

async function seedData() {
    try {
        const redisClient = await init();

        if (!redisClient || !redisClient.isOpen) {
            throw new Error("Redis client is not initialized or not connected");
        }

        await redisClient.incrBy("us", 1200);
        await redisClient.incrBy("ua", 450);
        await redisClient.incrBy("it", 300);
        await redisClient.incrBy("fr", 150);
        await redisClient.incrBy("de", 80);
        await redisClient.incrBy("es", 35);
        await redisClient.incrBy("ca", 15);
        await redisClient.incrBy("br", 5);
        await redisClient.incrBy("au", 0);

        console.log("Data has been seeded successfully.");

        await quit();
    } catch (error) {
        console.error("Error seeding data:", error);
        throw error;
    }
}

async function main() {
    try {
        await seedData();
    } catch (error) {
        console.error("Failed to initialize Redis and seed data:", error);
    }
}

main();
