import envConfig from 'src/configs/envConfig';

const Home = () => {
  console.log('Home', envConfig.VITE_BACKEND_BASE_URL);
  return (
    <div>
      <h1>Home</h1>
      <p>Check the console for the environment variable</p>
      <h1 className='text-3xl font-bold underline text-red-600'>Hello world</h1>
    </div>
  );
};

export default Home;
