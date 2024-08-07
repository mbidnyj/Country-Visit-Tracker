"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { countryCodeToName } from "./countryCodeToName";

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dynamically import the ChoroplethMap component
const ChoroplethMap = dynamic(() => import("./ChoroplethMap"), {
    ssr: false,
});

export default function Home() {
    const [countryCode, setCountryCode] = useState("us");
    const [feedback, setFeedback] = useState("");
    const [statistics, setStatistics] = useState({});

    // Fetch statistics on component mount
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

    const handleUpdateStatistics = async () => {
        try {
            const response = await axios.post("http://localhost:3000/update-statistics", {
                countryCode,
            });
            setFeedback(`Statistics updated for ${countryCode.toUpperCase()}.`);
            fetchStatistics();
        } catch (error) {
            setFeedback("Error updating statistics.");
        }
    };

    // Prepare data for the bar chart
    const chartData = {
        labels: Object.keys(statistics).map((code) => {
            const countryName = countryCodeToName[code.toLowerCase()] || code.toUpperCase();
            return countryName;
        }),
        datasets: [
            {
                label: "Visit Count",
                data: Object.values(statistics),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

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
                            <option value="ua">Ukraine</option>
                            <option value="it">Italy</option>
                            <option value="fr">France</option>
                            <option value="de">Germany</option>
                            <option value="es">Spain</option>
                            <option value="ca">Canada</option>
                            <option value="br">Brazil</option>
                            <option value="au">Australia</option>
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

            <div id="statistics-section" className="statistics-table mt-5">
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
                                <td>{country.toUpperCase()}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-5">
                <h3>Visit Distribution Chart</h3>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                            title: {
                                display: true,
                                text: "Distribution of Visits by Country",
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>

            <div id="statistics-section" className="statistics-table mt-5">
                <h3>Visit Statistics Map</h3>
                <ChoroplethMap statistics={statistics} />
            </div>
        </div>
    );
}
