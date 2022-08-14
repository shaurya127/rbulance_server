import React from 'react';

const Error = () => {
  return (
    <div className='bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 h-screen flex items-center justify-center'>
      <div className='flex items-center justify-center flex-col'>
        <h1 className='text-9xl text-center animate-bounce w-4/5 text-yellow-400 font-bold'>
          4😞4
        </h1>
        <h1 className='text-white text-4xl md:text-8xl font-semibold text-center py-12'>
          The page you requested doesn't exist
        </h1>
      </div>
    </div>
  );
};

export default Error;