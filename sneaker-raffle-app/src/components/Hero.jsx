import React from 'react';
import heroImage from '../assets/hero.jpg';

function Hero() {
  return (
    <>
      <hr className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-1 w-full border-0 my-gradient-div" />

      <section
        className="text-white bg-cover bg-center py-36 px-12 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
        }}
      >
        <div className="text-center">
          <h1 className="text-8xl font-bold">
            Welcome to Drip Drop
          </h1>
          <p className="mt-4 text-xl">
            Experience the thrill of sneaker raffles and grab your dream pair today!
          </p>
        </div>

      </section>
      <hr className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-1 w-full border-0 my-gradient-div" />
    </>
  );
}

export default Hero;
