import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  BsFilterCircle,
  BsFillFilterCircleFill,
} from 'react-icons/bs';

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
  const circleStyle = 'w-8 h-8 text-sm rounded-full flex justify-center items-center bg-gray-500 border-2 border-black  hover:scale-110 hover:font-bold hover:cursor-pointer hover:bg-white hover:text-gray-500';
  const longStyle = 'h-8 px-2 text-sm rounded-full flex justify-center items-center bg-gray-500 border-2 border-black  hover:scale-110 hover:font-bold hover:cursor-pointer hover:bg-white hover:text-gray-500';

  const { user } = useContext(UserContext);
  const [showFilters, setShowFiters] = useState(false);
  const [regionFilter, setRegionFilter] = useState([]);
  const [isShippedFilter, setIsShippedFilter] = useState([]);
  const [entryMethodFilter, setEntryMethodFilter] = useState([]);
  const [regionFilterOptions, setRegionFilterOptions] = useState([]);
  const [isShippedFilterOptions, setIsShippedFilterOptions] = useState([]);
  const [entryMethodFilterOptions, setEntryMethodFilterOptions] = useState([]);

  const { data: raffles, isLoading, error } = useQuery(
    ['raffles', sneaker.id],
    () => fetchRaffles(sneaker.id, user),
  );

  useEffect(() => {
    if (raffles) {
      setRegionFilterOptions([...new Set(raffles.map((r) => r.region))]);
      setIsShippedFilterOptions([...new Set(raffles.map((r) => (r.isShipped ? 'Shipped' : 'Collection Instore')))]);
      setEntryMethodFilterOptions([...new Set(raffles.map((r) => r.entryMethod))]);
    }
  }, [raffles]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  const toggleRegionFilter = (option) => {
    setRegionFilter((prevState) => {
      if (prevState.includes(option)) {
        return prevState.filter((item) => item !== option);
      }
      return [...prevState, option];
    });
  };

  const toggleIsShippedFilter = (option) => {
    setIsShippedFilter((prevState) => {
      if (prevState.includes(option)) {
        return prevState.filter((item) => item !== option);
      }
      return [...prevState, option];
    });
  };

  const toggleEntryMethodFilter = (option) => {
    setEntryMethodFilter((prevState) => {
      if (prevState.includes(option)) {
        return prevState.filter((item) => item !== option);
      }
      return [...prevState, option];
    });
  };

  const filteredRaffles = raffles.filter(
    (raffle) => (regionFilter.length === 0 || regionFilter.includes(raffle.region))
      && (isShippedFilter.length === 0 || isShippedFilter.includes(raffle.isShipped ? 'Shipped' : 'Collection Instore'))
      && (entryMethodFilter.length === 0 || entryMethodFilter.includes(raffle.entryMethod)),
  );

  return (
    <div className="overflow-hidden flex">
      <div className="w-1/3 bg-black text-white">
        <div className="relative flex flex-col overflow-hidden h-full">
          <div className="relative">
            <img
              src={
                sneaker.image
                || 'https://source.unsplash.com/random/200x200?hypebeast-sneakers'
              }
              alt="sneaker"
              className="w-full object-cover fadeimg"
            />
          </div>
          <div className="px-6">
            <h2 className="text-2xl font-bold ">{sneaker.name}</h2>
            <p className="text-md mb-3 text-slate-400">{sneaker.brand}</p>
            <span className="text-2xl mb-4 grad-text font-bold w-auto">
              {sneaker.price ? `$${sneaker.price}` : '£100'}
            </span>
          </div>
        </div>
      </div>
      <div className="w-2/3">
        <div className="px-6 py-2 rounded-lg m-2 bg-black text-white">
          <div className="flex justify-between items-center text-center mb-1">
            <h3 className="text-lg w-full text-center font-bold">
              {showFilters ? 'Filters' : 'Raffles'}
            </h3>
            <div
              className="text-2xl hover:scale-110 hover:animate-spin"
              onClick={() => setShowFiters(!showFilters)}
            >
              {!showFilters ? <BsFilterCircle /> : <BsFillFilterCircleFill />}
            </div>
          </div>

          {showFilters && (
          <div className="flex justify-evenly border-zinc-500 border-t-2">
            {
          regionFilterOptions.length > 1 && (
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Region</div>
              <div className="flex space-x-[-8px]  ">
                {regionFilterOptions.map((option) => (
                  <div
                    onClick={() => toggleRegionFilter(option)}
                    className={`${circleStyle} ${regionFilter.includes(option) ? 'bg-white text-gray-500' : 'text-white'}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )
        }

            <div className="flex flex-col align-middle justify-center items-center">
              <div>Shipping Method</div>
              <div className="flex space-x-[-8px]  ">
                {isShippedFilterOptions.map((option) => (
                  <div
                    onClick={() => toggleIsShippedFilter(option)}
                    className={`${longStyle} ${isShippedFilter.includes(option) ? 'bg-white text-gray-500' : 'text-white'}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            {
          entryMethodFilterOptions.length > 1 && (
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Entry Method</div>
              <div className="flex space-x-[-8px]  ">
                {entryMethodFilterOptions.map((option) => (
                  <div
                    onClick={() => toggleEntryMethodFilter(option)}
                    className={`${longStyle} ${entryMethodFilter.includes(option) ? 'bg-white text-gray-500' : 'text-white'}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )
        }
          </div>
          )}

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
