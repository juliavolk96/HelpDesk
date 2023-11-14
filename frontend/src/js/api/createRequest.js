const createRequest = async (options = {}) => {
  const { method, endpoint, body, headers } = options;

  try {
    const response = await fetch(`http://localhost:3000/api${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch(error) {
    console.log('Error in createRequest:', error);
    throw error;
  }
};

export default createRequest;
