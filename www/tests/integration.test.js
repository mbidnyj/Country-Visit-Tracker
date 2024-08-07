const axios = require("axios");

describe("Integration Tests", () => {
    const baseUrl = "http://localhost:3000";

    it("should update and retrieve statistics correctly", async () => {
        const initialResponse = await axios.get(`${baseUrl}/statistics`);
        const initialCount = initialResponse.data["us"] || 0;

        const updateResponse = await axios.post(`${baseUrl}/update-statistics`, { countryCode: "us" });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.data).toContain("Statistics updated for US");

        const updatedResponse = await axios.get(`${baseUrl}/statistics`);
        expect(updatedResponse.status).toBe(200);

        const updatedCount = updatedResponse.data["us"];
        expect(updatedCount).toBe(initialCount + 1);
    });

    it("should handle multiple updates correctly", async () => {
        const initialResponse = await axios.get(`${baseUrl}/statistics`);
        const initialCount = initialResponse.data["ua"] || 0;

        await axios.post(`${baseUrl}/update-statistics`, { countryCode: "ua" });
        await axios.post(`${baseUrl}/update-statistics`, { countryCode: "ua" });
        await axios.post(`${baseUrl}/update-statistics`, { countryCode: "ua" });

        const updatedResponse = await axios.get(`${baseUrl}/statistics`);
        expect(updatedResponse.status).toBe(200);

        const updatedCount = updatedResponse.data["ua"];
        expect(updatedCount).toBe(initialCount + 3);
    });
});
