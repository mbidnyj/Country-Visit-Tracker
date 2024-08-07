const { redisClient, init } = require("./redisClient");

const seedData = async () => {
    try {
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
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        redisClient.quit();
    }
};

const main = async () => {
    try {
        await init();
        await seedData();
    } catch (err) {
        console.error("Failed to initialize Redis and seed data:", err);
    }
};

main();
