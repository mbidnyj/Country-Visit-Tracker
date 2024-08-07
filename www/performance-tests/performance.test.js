import http from "k6/http";
import { check } from "k6";

export const options = {
    stages: [
        { duration: "1m", target: 1000 },
        { duration: "10m", target: 1000 },
    ],
};

export default function () {
    const res = http.get("http://localhost:3000/statistics");
    check(res, { "status was 200": (r) => r.status === 200 });
}
