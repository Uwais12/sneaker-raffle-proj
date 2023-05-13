import React, { useState } from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import Tilt from 'react-parallax-tilt';
import SneakerDetails from './SneakerDetails';
import api from '../api';
import useUser from '../hooks/useUser';
import bg from '../assets/bggg.jpg';

const fetchSneakers = async () => {
  const { data } = await api.get('/api/sneakers');
  return data;
};

function SneakerList() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const { user } = useUser();
  const numberOfRaffles = 10;
  const { data: sneakers, isLoading, isError } = useQuery('sneakers', fetchSneakers);

  if (isLoading) {
    return <p className="text-gray-300 text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-red-500 text-center">Error fetching sneakers</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="col-span-2 flex justify-center">
          <h1 className="text-3xl font-bold mb-6 text-white">Upcoming Sneaker Releases</h1>
        </div>
        {sneakers.map((sneaker) => (

          <div className="relative bg-gray-900 text-white overflow-hidden rounded-xl shadow-2xl flex">
            <div className="w-1/2">
              <img src="https://source.unsplash.com/random/200x200?hypebeast-sneakers" alt={sneaker.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-1/2 p-6 md:p-10">
              <h2 className="text-4xl font-bold mb-4">{sneaker.name}</h2>
              <p className="text-xl mb-4">
                Brand:
                {' '}
                {sneaker.brand}
              </p>
              <p className="text-xl mb-4">
                Release Date:
                {' '}
                {sneaker.releaseDate}
              </p>
              <p className="text-2xl font-semibold mb-4">
                Price:
                {' '}
                {sneaker.price ? `$${sneaker.price}` : 'N/A'}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-thumbs-up text-green-500" />
                  <span>{sneaker.thumbsUpCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-thumbs-down text-red-500" />
                  <span>{sneaker.thumbsDownCount}</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 bg-blue-500 text-black px-3 py-1 text-lg font-bold rounded-bl-md">
              ID:
              {' '}
              {sneaker.id}
            </div>
          </div>

        ))}
      </div>
      {selectedSneaker && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setSelectedSneaker(null)}
        >

          <div className="bg-gray-800 text-white w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-screen" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="absolute top-4 right-4 text-gray-500 hover:text-gray-900" onClick={() => setSelectedSneaker(null)}>
              &times;
            </button>
            <SneakerDetails sneaker={selectedSneaker} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SneakerList;
