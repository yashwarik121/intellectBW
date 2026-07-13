import axios from 'axios';

const BASE_URL = 'https://httpstat.us';

// Simple API helper using Axios for GET/POST requests
export async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}${endpoint}`;
  
  const config = {
    method: method.toUpperCase(),
    url,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (data && (config.method === 'POST' || config.method === 'PUT')) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Axios request failed to ${url}:`, error);
    throw error;
  }
}
