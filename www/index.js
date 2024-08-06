const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");

const app = express();
const port = process.env.PORT || 3000;

const redisClient = redis.createClient({
    url: "redis://localhost:6379",
});

redisClient.connect().catch(console.error);

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

redisClient.on("ready", () => {
    console.log("Connected to Redis");
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Country Visit Statistics Tracker API");
});

app.post("/update-statistics", async (req, res) => {
    const { countryCode } = req.body;

    if (!countryCode) {
        return res.status(400).send("Country code is required.");
    }

    try {
        await redisClient.incr(countryCode);
        res.status(200).send(`Statistics updated for ${countryCode.toUpperCase()}.`);
    } catch (err) {
        console.error("Redis error:", err);
        res.status(500).send("Error updating statistics.");
    }
});

app.get("/statistics", async (req, res) => {
    try {
        const keys = await redisClient.keys("*");
        if (keys.length === 0) {
            return res.status(200).json({});
        }

        const values = await redisClient.mGet(keys);
        const statistics = {};
        keys.forEach((key, index) => {
            statistics[key] = parseInt(values[index], 10);
        });

        res.status(200).json(statistics);
    } catch (err) {
        console.error("Redis error:", err);
        res.status(500).send("Error retrieving statistics.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
