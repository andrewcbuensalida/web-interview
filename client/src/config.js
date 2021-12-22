const API_ENDPOINT =
  process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3400/api/v1';

export { API_ENDPOINT };
