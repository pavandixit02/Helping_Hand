import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Ramp up to 100 VUs
    { duration: '1m', target: 100 },  // Stay at 100 VUs
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be less than 1%
  },
};

const PAGES = [
  // customer-web (3000)
  'http://localhost:3000/', 'http://localhost:3000/about', 'http://localhost:3000/appointments',
  'http://localhost:3000/contact', 'http://localhost:3000/dashboard', 'http://localhost:3000/forgot-password',
  'http://localhost:3000/privacy', 'http://localhost:3000/profile', 'http://localhost:3000/services',
  'http://localhost:3000/settings', 'http://localhost:3000/signin', 'http://localhost:3000/signup',
  'http://localhost:3000/specialists', 'http://localhost:3000/terms',
  
  // admin-web (3001)
  'http://localhost:3001/', 'http://localhost:3001/ai-dashboard', 'http://localhost:3001/cms',
  'http://localhost:3001/dashboard', 'http://localhost:3001/logs',
  
  // partner-web (3002)
  'http://localhost:3002/', 'http://localhost:3002/appointments', 'http://localhost:3002/availability',
  'http://localhost:3002/dashboard', 'http://localhost:3002/patients', 'http://localhost:3002/profile',
  
  // operator-web (3003)
  'http://localhost:3003/', 'http://localhost:3003/dashboard', 'http://localhost:3003/kyc',
  'http://localhost:3003/support', 'http://localhost:3003/users'
];

export default function () {
  const page = PAGES[Math.floor(Math.random() * PAGES.length)];
  const res = http.get(page);
  
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1); // Simulate user wait time
}
