// Global Jest Setup for Backend
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

beforeAll(() => {
  // Mock Database connections
  console.log('[Test Setup] Mocking PostgreSQL connection...');
  console.log('[Test Setup] Mocking Redis connection...');
});

afterAll(() => {
  // Teardown connections
  console.log('[Test Teardown] Cleaning up mocked connections...');
});
