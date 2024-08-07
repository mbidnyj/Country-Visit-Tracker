"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { countryCodeToName } from "./countryCodeToName";

export default function ChoroplethMap({ statistics }) {
    const [geoData, setGeoData] = useState(null);
    const [maxVisits, setMaxVisits] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
                .then((response) => response.json())
                .then((data) => {
                    let maxVisitsTemp = 0;

                    data.features.forEach((feature) => {
                        const countryName = feature.properties.name;

                        const countryCode = Object.keys(countryCodeToName).find(
                            (key) => countryCodeToName[key] === countryName
                        );

                        const visits = countryCode && statistics[countryCode] ? statistics[countryCode] : 0;

                        feature.properties.visits = visits;

                        // Track the maximum visits
                        if (visits > maxVisitsTemp) {
                            maxVisitsTemp = visits;
                        }
                    });

                    setMaxVisits(maxVisitsTemp);
                    setGeoData(data);
                    console.log("GeoData after mapping visits:", data);
                })
                .catch((error) => console.error("Error fetching GeoJSON data:", error));
        }
    }, [statistics]);

    const getColor = (visits) => {
        if (maxVisits === 0) return "#FFEDA0";
        const ratio = visits / maxVisits;

        if (ratio > 0.9) return "#800026";
        if (ratio > 0.7) return "#BD0026";
        if (ratio > 0.5) return "#E31A1C";
        if (ratio > 0.3) return "#FC4E2A";
        if (ratio > 0.2) return "#FD8D3C";
        if (ratio > 0.1) return "#FEB24C";
        if (ratio > 0) return "#FED976";
        return "#FFEDA0";
    };

    const style = (feature) => ({
        fillColor: getColor(feature.properties.visits),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
    });

    return (
        <MapContainer style={{ height: "500px", width: "100%" }} center={[20, 0]} zoom={2} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData && <GeoJSON data={geoData} style={style} />}
        </MapContainer>
    );
}
