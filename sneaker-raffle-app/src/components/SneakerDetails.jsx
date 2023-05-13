import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  FaGlobe, FaStore, FaLaptop, FaCalendarAlt, FaShoePrints, FaTags,
} from 'react-icons/fa';
import api from '../api';
import useUser from '../hooks/useUser';

const fetchRaffles = async (sneakerId, user) => {
  const { data } = await api.get(`/api/raffles/sneaker/${sneakerId}`, {
    ...(user && {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
  });
  console.log('THESE ', data);
  return data;
};

function SneakerDetails({ sneaker }) {
  const { user } = useUser();
  const [regionFilter, setRegionFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [entryMethodFilter, setEntryMethodFilter] = useState('');

  const { data: raffles, isLoading, error } = useQuery(['raffles', sneaker.id], () => fetchRaffles(sneaker.id, user));

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  const filteredRaffles = raffles.filter((raffle) => (
    (regionFilter === '' || raffle.region === regionFilter)
      && (typeFilter === '' || raffle.type === typeFilter)
      && (entryMethodFilter === '' || raffle.entryMethod === entryMethodFilter)
  ));

  return (
    <div>
      <div className="flex items-center space-x-4">
        <img src={sneaker.imageUrl} alt={sneaker.name} className="w-32 h-32 object-cover rounded-xl shadow" />
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FaShoePrints className="text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">{sneaker.name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <FaTags className="text-yellow-600" />
            <p className="text-gray-700">{sneaker.brand}</p>
          </div>
          <p className="text-gray-700">
            Release Date:
            {sneaker.releaseDate}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Raffles:</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <FaGlobe className="absolute top-2 left-2 text-blue-400" />
            <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="border border-blue-300 rounded-md p-2 pl-8 w-full">
              <option value="">Filter by region</option>
              <option value="US">US</option>
            </select>
          </div>

          <div className="relative">
            <FaStore className="absolute top-2 left-2 text-green-400" />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-green-300 rounded-md p-2 pl-8 w-full">
              <option value="">Filter by type</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="relative">
            <FaLaptop className="absolute top-2 left-2 text-purple-400" />
            <select value={entryMethodFilter} onChange={(e) => setEntryMethodFilter(e.target.value)} className="border border-purple-300 rounded-md p-2 pl-8 w-full">
              <option value="">Filter by entry method</option>
              <option value="Website">Website</option>
            </select>
          </div>
        </div>

        <ul className="space-y-4">
          {filteredRaffles.map((raffle) => (
            <li key={raffle.id} className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-8">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{raffle.name}</h4>
                  <p className="text-gray-700">
                    Region:
                    {raffle.region}
                  </p>
                  <p className="text-gray-700">
                    Type:
                    {raffle.type}
                  </p>
                  <p className="text-gray-700">
                    Entry Method:
                    {raffle.entryMethod}
                  </p>
                  <p className="text-gray-700">
                    Start Date:
                    {raffle.startDate}
                  </p>
                  <p className="text-gray-700">
                    End Date:
                    {raffle.endDate}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default SneakerDetails;
