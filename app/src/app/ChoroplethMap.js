"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { countryCodeToName } from "./countryCodeToName";

export default function ChoroplethMap({ statistics }) {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
                .then((response) => response.json())
                .then((data) => {
                    data.features.forEach((feature) => {
                        const countryName = feature.properties.name;

                        const countryCode = Object.keys(countryCodeToName).find(
                            (key) => countryCodeToName[key] === countryName
                        );

                        const visits = countryCode && statistics[countryCode] ? statistics[countryCode] : 0;

                        feature.properties.visits = visits;
                    });

                    setGeoData(data);
                    console.log("GeoData after mapping visits:", data);
                })
                .catch((error) => console.error("Error fetching GeoJSON data:", error));
        }
    }, [statistics]);

    const getColor = (visits) => {
        if (visits > 500) return "#800026";
        if (visits > 200) return "#BD0026";
        if (visits > 100) return "#E31A1C";
        if (visits > 50) return "#FC4E2A";
        if (visits > 20) return "#FD8D3C";
        if (visits > 10) return "#FEB24C";
        if (visits > 0) return "#FED976";
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
