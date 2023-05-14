import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SneakerDetails from './SneakerDetails';
import api from '../api';

const fetchSneakers = async () => {
  const { data } = await api.get('/api/sneakers');
  return data;
};

function SneakerList() {
  const [selectedSneaker, setSelectedSneaker] = useState(null);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="col-span-4 flex justify-center">
          <h1 className="text-5xl font-bold mb-4 mt-4 grad-text">Upcoming Sneaker Releases</h1>
        </div>
        {sneakers.map((sneaker) => (
          <div className="hover-container" key={sneaker.id}>

            <div className="relative bg-black border-zinc-700 border-2 text-white rounded-xl shadow-2xl flex flex-col overflow-hidden blur-container h-full">
              <div className="relative">
                <img
                  src={sneaker.image || 'https://source.unsplash.com/random/200x200?hypebeast-sneakers'}
                  alt="sneaker"
                  className="w-full h-full object-cover fadeimg"
                />
                <div className="absolute top-0 left-0 p-6">
                  <div className="flex">
                    <div className="w-1/2">
                      <div className="text-lg font-semibold mb-4">
                        <div className="border-2 border-zinc-700 rounded-lg w-16 text-center overflow-hidden">
                          <div className="my-gradient-div text-white font-bold py-1">JAN</div>
                          <div className="py-1 bg-black">{25}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold ">{sneaker.name}</h2>
                <p className="text-md mb-3 text-slate-400">
                  {sneaker.brand}
                </p>
                <span className="text-2xl mb-4 grad-text font-bold w-auto">
                  {sneaker.price ? `$${sneaker.price}` : '£100'}
                </span>

              </div>
              <div
                className="absolute bottom-0 right-0 bg-blue-500 text-black px-3 py-1 text-lg font-bold rounded-tl-md my-gradient-div text-white cursor-pointer hover:scale-110 transition-transform duration-200"
              >
                {sneaker.thumbsUpCount}
                {' '}
                &#x1F525;
              </div>
            </div>
            <button
              type="button"
              className="cool-button text-2xl font-bold"
              onClick={() => { setSelectedSneaker(sneaker); document.body.style.overflow = 'hidden'; }}

            >
              Click to view
              {' '}
              {numberOfRaffles}
              {' '}
              raffles
              &#8594;

            </button>
            {/* <div><span className="cool-button text-3xl font-bold">Click me!</span></ */}
          </div>

        ))}
      </div>
      {selectedSneaker && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backdropFilter: 'blur(10px)' }}
          onClick={() => {
            setSelectedSneaker(null); document.body.style.overflow = 'auto';
          }}
        >

          <div className="my-gradient-div2 text-black w-full max-w-5xl rounded-lg shadow-lg overflow-y-auto backdrop-filter backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
            <SneakerDetails
              sneaker={selectedSneaker}
              onClose={() => {
                setSelectedSneaker(null); document.body.style.overflow = 'auto';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SneakerList;
