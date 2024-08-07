const axios = require("axios");
const { init, flushDb, quit } = require("../redisClient");

describe("Country Visit Statistics API", () => {
    const baseUrl = "http://backend:3000";

    beforeAll(async () => {
        await init();
    });

    beforeEach(async () => {
        await flushDb();
    });

    afterAll(async () => {
        await quit();
    });

    it("should return statistics", async () => {
        await axios.post(`${baseUrl}/statistics`, { countryCode: "us" });
        const response = await axios.get(`${baseUrl}/statistics`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("us");
    });

    it("should update statistics and return success", async () => {
        const initialResponse = await axios.get(`${baseUrl}/statistics`);
        const initialCount = initialResponse.data["us"] || 0;

        const updateResponse = await axios.post(`${baseUrl}/statistics`, {
            countryCode: "us",
        });

        expect(updateResponse.status).toBe(200);

        const updatedResponse = await axios.get(`${baseUrl}/statistics`);
        expect(updatedResponse.data["us"]).toBe(initialCount + 1);
    });

    it("should return an error when no country code is provided", async () => {
        try {
            await axios.post(`${baseUrl}/statistics`, {});
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe("Country code is required.");
        }
    });

    it("should return an error for an invalid country code", async () => {
        try {
            await axios.post(`${baseUrl}/statistics`, { countryCode: "invalidCode" });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe("Invalid country code");
        }
    });

    it("should handle multiple updates correctly", async () => {
        const initialResponse = await axios.get(`${baseUrl}/statistics`);
        const initialCount = initialResponse.data["ua"] || 0;

        await axios.post(`${baseUrl}/statistics`, { countryCode: "ua" });
        await axios.post(`${baseUrl}/statistics`, { countryCode: "ua" });
        await axios.post(`${baseUrl}/statistics`, { countryCode: "ua" });

        const updatedResponse = await axios.get(`${baseUrl}/statistics`);
        expect(updatedResponse.status).toBe(200);

        const updatedCount = updatedResponse.data["ua"];
        expect(updatedCount).toBe(initialCount + 3);
    });
});
