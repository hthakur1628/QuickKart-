import app from './src/app.js';

const server = app.listen(0, async () => {
  const port = server.address().port;
  console.log(`Test server running on port ${port}`);

  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/health`);
    const status = res.status;
    const body = await res.json();
    console.log(`HTTP Status: ${status}`);
    console.log('Response body:', JSON.stringify(body, null, 2));

    if (status === 200 && body.status === 'ok') {
      console.log('SMOKE TEST PASSED');
      server.close(() => process.exit(0));
    } else {
      console.error('SMOKE TEST FAILED: Unexpected response');
      server.close(() => process.exit(1));
    }
  } catch (err) {
    console.error('SMOKE TEST FAILED with error:', err.message);
    server.close(() => process.exit(1));
  }
});
