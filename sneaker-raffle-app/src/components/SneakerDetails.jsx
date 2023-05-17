import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  FaGlobe, FaStore, FaLaptop,

} from 'react-icons/fa';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactTinyLink } from 'react-tiny-link';
import api from '../api';

import { UserContext } from '../context/UserContext';
import LineComponent from './Line';
import LinkPreviewComponent from './LinkPreview';
import RaffleCard from './RaffleCard';

const fetchRaffles = async (sneakerId, user) => {
  const { data } = await api.get(`/api/raffles/sneaker/${sneakerId}`, {
    ...(user && {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
  });
  console.log('raffles in sneaker card ', data);
  return data;
};

function SneakerDetails({ sneaker, onClose }) {
  const circleStyle = 'w-10 h-10 rounded-full flex justify-center items-center bg-gray-500 border-2 border-black text-white hover:scale-110 hover:font-bold hover:cursor-pointer hover:bg-white hover:text-gray-500';
  const longStyle = 'w-20 h-10 rounded-full flex justify-center items-center bg-gray-500 border-2 border-black text-white hover:scale-110 hover:font-bold hover:cursor-pointer hover:bg-white hover:text-gray-500';

  const { user } = useContext(UserContext);
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
    <div className="overflow-hidden flex">
      <div className="w-1/3 bg-black text-white">
        <div className="relative flex flex-col overflow-hidden h-full">
          <div className="relative">
            <img
              src={sneaker.image || 'https://source.unsplash.com/random/200x200?hypebeast-sneakers'}
              alt="sneaker"
              className="w-full object-cover fadeimg"
            />
          </div>
          <div className="px-6">
            <h2 className="text-2xl font-bold ">{sneaker.name}</h2>
            <p className="text-md mb-3 text-slate-400">
              {sneaker.brand}
            </p>
            <span className="text-2xl mb-4 grad-text font-bold w-auto">
              {sneaker.price ? `$${sneaker.price}` : '£100'}
            </span>

          </div>
        </div>
      </div>
      <div className="w-2/3">
        <div className="px-6 py-2 rounded-lg m-2 bg-black text-white">
          <div className="flex justify-between">
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Region</div>

              <div className="flex space-x-[-8px]  ">
                <div className={circleStyle}>EU</div>
                <div className={circleStyle}>UK</div>
                <div className={circleStyle}>US</div>
                <div className={circleStyle}>WW</div>

              </div>
            </div>
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Type</div>
              <div className="flex space-x-[-8px]  ">
                <div className={longStyle}>Social</div>
                <div className={longStyle}>Online</div>

              </div>
            </div>
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Shipping</div>
              <div className="flex space-x-[-8px]  ">
                <div className={longStyle}>In-store</div>
                <div className={longStyle}>Shipping</div>

              </div>
            </div>

          </div>
        </div>
        <ul className="overflow-y-auto max-h-96">
          {filteredRaffles.map((raffle) => (
            <li key={raffle.id} className="mt-0.5">
              <RaffleCard raffle={raffle} />
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}
export default SneakerDetails;
