import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata = {
    title: "Country Visit Statistics Tracker",
    description: "A simple app to track and display visit statistics by country",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
