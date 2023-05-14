import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import {
  FaGlobe, FaStore, FaLaptop,
} from 'react-icons/fa';
import api from '../api';
import { UserContext } from '../context/UserContext';

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
        <div className="px-6 py-2 border-2 rounded-lg m-2 border-black">
          <div className="flex justify-between bg-green">
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Type</div>
              <div className="flex space-x-[-8px]  ">
                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105 hover:font-bold mx-auto">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>

                <div className="w-10 h-10 rounded-full flex justify-center bg-white/40 font-bold items-center">EU</div>

                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>

              </div>
            </div>
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Type</div>
              <div className="flex space-x-[-8px] ">
                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105 hover:font-bold mx-auto">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>

                <div className="w-10 h-10 rounded-full flex justify-center bg-white/40 font-bold items-center">EU</div>

                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>
                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>
                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>

              </div>
            </div>
            <div className="flex flex-col align-middle justify-center items-center">
              <div>Type</div>
              <div className="flex space-x-[-8px] ">
                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105 hover:font-bold mx-auto">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>

                <div className="w-10 h-10 rounded-full flex justify-center bg-white/40 font-bold items-center">EU</div>

                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>
                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>
                <div className="bg-black/50 w-10 h-10 rounded-full hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex justify-center items-center border-2 border-zinc-500 text-zinc-500 text-md gradtcircle">EU</div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <ul className="overflow-y-auto max-h-96">
          {filteredRaffles.map((raffle) => (
            <li key={raffle.id} className="mt-0.5">
              <div className="p-4 bg-white/10 flex justify-between">
                <div className="">
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
                <div className="">
                  go to raffle !
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
