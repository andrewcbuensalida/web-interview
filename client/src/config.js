const API_ENDPOINT =
  process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3400/api/v1';

// eslint-disable-next-line import/prefer-default-export
export { API_ENDPOINT };
