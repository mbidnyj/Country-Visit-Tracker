const axios = require("axios");

describe("API Tests", () => {
    const baseUrl = "http://localhost:3000";

    it("should return statistics", async () => {
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

    it("should return an error for invalid country code", async () => {
        try {
            await axios.post(`${baseUrl}/statistics`, {
                countryCode: "invalid",
            });
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
});
