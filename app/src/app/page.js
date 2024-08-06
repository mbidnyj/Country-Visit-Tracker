"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default function Home() {
    const [countryCode, setCountryCode] = useState("us");
    const [feedback, setFeedback] = useState("");
    const [statistics, setStatistics] = useState({});
    const [chart, setChart] = useState(null);

    const handleUpdateStatistics = async () => {
        try {
            const response = await axios.post("http://localhost:3000/update-statistics", {
                countryCode,
            });
            setFeedback(`Statistics updated for ${countryCode.toUpperCase()}.`);

            // Fetch updated statistics
            fetchStatistics();
        } catch (error) {
            setFeedback("Error updating statistics.");
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await axios.get("http://localhost:3000/statistics");
            setStatistics(response.data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    useEffect(() => {
        if (Object.keys(statistics).length > 0) {
            if (chart) {
                chart.destroy();
            }
            const ctx = document.getElementById("visit-chart").getContext("2d");
            setChart(
                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: Object.keys(statistics),
                        datasets: [
                            {
                                label: "Visit Count",
                                data: Object.values(statistics),
                                backgroundColor: "rgba(54, 162, 235, 0.2)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                })
            );
        }
    }, [statistics]);

    return (
        <div className="container">
            <div className="text-center">
                <h1>Country Visit Statistics Tracker</h1>
                <p className="text-muted">Select a country to update the visit statistics.</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="country-select">Choose a country:</label>
                        <select
                            className="form-control"
                            id="country-select"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        >
                            <option value="us">United States</option>
                            <option value="it">Italy</option>
                            <option value="fr">France</option>
                            <option value="de">Germany</option>
                            <option value="es">Spain</option>
                            <option value="ua">Ukraine</option>
                        </select>
                    </div>
                    <button id="submit-button" className="btn btn-primary btn-block" onClick={handleUpdateStatistics}>
                        Update Statistics
                    </button>
                    <div id="feedback" className="text-center mt-3">
                        {feedback}
                    </div>
                </div>
            </div>

            <div
                id="statistics-section"
                className="statistics-table"
                style={{ display: Object.keys(statistics).length ? "block" : "none" }}
            >
                <h3>Visit Statistics</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Country Code</th>
                            <th scope="col">Visit Count</th>
                        </tr>
                    </thead>
                    <tbody id="statistics-table-body">
                        {Object.entries(statistics).map(([country, count]) => (
                            <tr key={country}>
                                <td>{country}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div
                id="chart-section"
                className="chart-container"
                style={{ display: Object.keys(statistics).length ? "block" : "none" }}
            >
                <h3>Visit Distribution Chart</h3>
                <canvas id="visit-chart"></canvas>
            </div>
        </div>
    );
}
