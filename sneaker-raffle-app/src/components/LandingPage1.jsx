/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import heroImage from '../assets/snkr.jpeg';

function LandingPage() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between p-6">
        <div className="text-4xl font-bold text-purple-500">StreetX</div>
        <div className="space-x-4">
          <a href="#" className="hover:text-purple-500">Shop</a>
          <a href="#" className="hover:text-purple-500">About</a>
          <a href="#" className="hover:text-purple-500">Contact</a>
        </div>
      </div>

      {/* Hero section */}
      <div
        className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-4 bg-center bg-cover bg-no-repeat text-white"
        style={{ backgroundImage: `url(${heroImage}), linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.7))`, height: '40em' }}
      >
        <h1 className="text-5xl font-bold">Welcome to StreetX</h1>
        <p className="text-xl">Your one stop shop for the hottest streetwear.</p>
        <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded font-bold">Shop Now</button>
      </div>

      {/* Product showcase */}
      <div className="grid grid-cols-3 gap-4 p-6">
        {['Product 1', 'Product 2', 'Product 3'].map((product) => (
          <div className="bg-gray-100 p-6 rounded">
            <img src={`/${product}.png`} alt={product} className="w-full h-64 object-cover mb-4" />
            <div className="text-purple-500 text-lg font-bold">{product}</div>
            <div className="text-gray-800">Some description about the product.</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-100 text-center text-gray-800">
        &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        StreetX. All rights reserved.
      </div>
    </div>
  );
}

export default LandingPage;
