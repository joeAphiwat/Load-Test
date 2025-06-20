import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 100, // reduced virtual users to prevent server overload
  iterations: 10000, // reduced total number of requests for better manageability
  thresholds: {
    http_req_failed: ['rate<0.01'], // less than 1% of requests should fail
    http_req_duration: ['p(95)<10000'], // 95% of requests should be below 10000ms
  },
};

export default function () {
  const headers = {
    headers: {
      'Authorization': 'Bearer ----', // replace YOUR_ACCESS_TOKEN with the actual token
    },
  };

  const url = 'https://jsonplaceholder.typicode.com/posts/1'; // example public API
  const res = http.get(url, headers);

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  if (!success) {
    console.error('Request failed:', res.status, res.body);
  }

  sleep(1); // add a sleep to reduce the load on the server
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'summary.json': JSON.stringify(data),
    "result.html": htmlReport(data),
  };
} 