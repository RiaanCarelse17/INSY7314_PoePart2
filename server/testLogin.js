const axios = require('axios');

async function testLogin(username, password) {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      username,
      password
    });
    console.log('Response:', response.data);
  } catch (err) {
    if (err.response) {
      //The server returned an error response
      console.log('Error:', err.response.status, err.response.data);
    } else {
      console.log('Request error:', err.message);
    }
  }
}

// ✅ Test user
testLogin('testuser', 'testpassword');

