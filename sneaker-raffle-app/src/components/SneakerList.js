import React, { useState } from 'react';
import SneakerDetails from './SneakerDetails';
import { useQuery } from 'react-query';
import api from '../api';
import useUser from '../hooks/useUser';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Newsletter from './Newsletter';

const fetchSneakers = async () => {
    const { data } = await api.get('/api/sneakers'); // Replace with your endpoint
    return data;
};

const SneakerList = () => {
    const [selectedSneaker, setSelectedSneaker] = useState(null);
    const { user } = useUser();
    const { data: sneakers, isLoading, isError } = useQuery('sneakers', fetchSneakers);

    if (isLoading) {
        return <React.Fragment><p>Loading...</p></React.Fragment>;
    }

    if (isError) {
        return <React.Fragment><p>Error fetching sneakers</p></React.Fragment>;
    }

    return (
        <React.Fragment>
            <AboutUs />
            <h1 className="text-3xl font-bold mb-6">Upcoming Sneaker Releases</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sneakers.map((sneaker) => (
                    <div
                        key={sneaker.id}
                        className="border rounded-lg shadow hover:shadow-lg p-8 cursor-pointer transition-all duration-200 bg-white hover:bg-gray-100 transform hover:scale-105"
                        onClick={() => setSelectedSneaker(sneaker)}
                    >
                        <img
                            src={sneaker.imageUrl || "https://source.unsplash.com/random/200x200?hypebeast-sneakers"}
                            alt={sneaker.name}
                            className="w-full h-64 object-cover mb-6 rounded-lg"
                        />
                        <h3 className="text-2xl font-semibold mb-2">{sneaker.name}</h3>
                        <p className="text-gray-500 mb-2">{sneaker.brand}</p>
                        <p>Release Date: {sneaker.releaseDate}</p>

                    </div>
                ))}
            </div>
            {selectedSneaker && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    onClick={() => setSelectedSneaker(null)}
                >
                    <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-screen" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900" onClick={() => setSelectedSneaker(null)}>
                            &times;
                        </button>
                        <SneakerDetails sneaker={selectedSneaker} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default SneakerList;
