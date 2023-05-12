import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.jpg';

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-white bg-cover bg-center py-48 px-12 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
        backgroundOpacity: 0.7,
      }}
    >
      <div className="text-center">
        <motion.h1
          initial={{ y: -250 }}
          animate={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="text-8xl font-bold"
        >
          Welcome to Drip Drop
        </motion.h1>
        <motion.p
          initial={{ y: 250 }}
          animate={{ y: 10 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="mt-4 text-xl"
        >
          Experience the thrill of sneaker raffles and grab your dream pair today!
        </motion.p>
      </div>
    </motion.section>
  );
}

export default Hero;
