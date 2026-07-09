const BASE_URL = 'https://httpstat.us';

// Simple API helper for GET/POST requests
export async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}${endpoint}`;
  
  const config = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (data && (config.method === 'POST' || config.method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
}
