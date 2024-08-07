const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("./redisClient");

const main = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    // Middleware
    app.use(bodyParser.json());
    app.use(cors());

    // Routes
    app.get("/", (req, res) => {
        res.send("Country Visit Statistics Tracker API");
    });

    app.post("/statistics", async (req, res) => {
        const { countryCode } = req.body;
        try {
            await redis.incrementStatistics(countryCode);
            res.status(200).send(`Statistics updated for ${countryCode.toUpperCase()}.`);
        } catch (error) {
            console.error("Error updating statistics:", error);
            res.status(500).send("Error updating statistics.");
        }
    });

    app.get("/statistics", async (req, res) => {
        try {
            const stats = await redis.getStatistics();
            res.status(200).json(stats);
        } catch (error) {
            console.error("Error fetching statistics:", error);
            res.status(500).send("Error fetching statistics.");
        }
    });

    await redis.init();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

// Call the main function to start the server
main().catch((err) => {
    console.error("Failed to start the server:", err);
});
