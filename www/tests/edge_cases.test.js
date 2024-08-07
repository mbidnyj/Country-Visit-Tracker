const axios = require("axios");

describe("Edge Case Tests", () => {
    const baseUrl = "http://localhost:3000";

    it("should return an error when no country code is provided", async () => {
        try {
            await axios.post(`${baseUrl}/update-statistics`, {});
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe("Country code is required.");
        }
    });

    it("should return an error for an invalid country code", async () => {
        try {
            await axios.post(`${baseUrl}/update-statistics`, { countryCode: "invalidCode" });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe("Invalid country code");
        }
    });
});
