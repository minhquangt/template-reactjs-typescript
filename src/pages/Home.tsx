import React from 'react';
import envConfig from 'src/configs/envConfig';

const Home = () => {
  console.log('Home', envConfig.VITE_BACKEND_BASE_URL);
  return <div>Home</div>;
};

export default Home;
