import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SneakerDetails from './SneakerDetails';
import api from '../api';
import useUser from '../hooks/useUser';

const fetchSneakers = async () => {
  const { data } = await api.get('/api/sneakers'); // Replace with your endpoint
  return data;
};

function SneakerList() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const { user } = useUser();
  const { data: sneakers, isLoading, isError } = useQuery('sneakers', fetchSneakers);

  if (isLoading) {
    return <p className="text-gray-300 text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-red-500 text-center">Error fetching sneakers</p>;
  }

  return (
  // <div className="bg-gray-900 rounded-lg shadow-2xl md:px-12 md:py-6 text-white">
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Upcoming Sneaker Releases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sneakers.map((sneaker) => (
          // <div key={sneaker.id} className="rounded-lg shadow cursor-pointer hover:shadow-lg p-0.5 bg-gradient-to-r from-pink-500 to-yellow-500">
          <div
            className="p-8 rounded-lg  transition-all bg-black hover:bg-black hover:scale-95 h-full rounded-lg shadow cursor-pointer hover:shadow-lg p-0.5 bg-gray-800"
            onClick={() => setSelectedSneaker(sneaker)}
          >
            <img
              src={sneaker.imageUrl || 'https://source.unsplash.com/random/200x200?hypebeast-sneakers'}
              alt={sneaker.name}
              className="w-full h-64 object-cover mb-6 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-2 text-white">{sneaker.name}</h3>
            <p className="text-gray-500 mb-2">{sneaker.brand}</p>
            <p className="text-white">
              Release Date:
              {sneaker.releaseDate}
            </p>
          </div>
          // </div>

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
