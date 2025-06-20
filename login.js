import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// import { jsontohtml } from 'jsontohtml-render';
// const { jsontohtml } = require("jsontohtml-render");   //for CommonJS

// console.log(jsontohtml({ hello: 'moto' }));

export const options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  // Step 1: Login
  const loginPayload = JSON.stringify({
    username: 'test-user',
    password: 'supersecure',
  });

  const loginHeaders = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post('https://test-api.k6.io/auth/token/login/', loginPayload, loginHeaders);
  const loginSuccess = check(loginRes, {
    '🔐 login success': (r) => r.status === 200,
  });

  if (!loginSuccess) {
    console.error('Login failed:', loginRes.status, loginRes.body);
    return;
  }

  const token = JSON.parse(loginRes.body).access;

  // Step 2: Call API with token
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = http.get('https://test-api.k6.io/my/crocodiles/', authHeaders);
  check(res, {
    '🐊 get private crocodiles success': (r) => r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'summary.json': JSON.stringify(data),
    "result.html": htmlReport(data),
  };
}