import React from 'react';
import envConfig from 'src/configs/envConfig';

const Home = () => {
  console.log('Home', envConfig.VITE_BACKEND_BASE_URL);
  return (
    <div>
      <h1>Home</h1>
      <p>Check the console for the environment variable</p>
    </div>
  );
};

export default Home;
