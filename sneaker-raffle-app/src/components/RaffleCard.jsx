import { React, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMeasure } from 'react-use';
import LineComponent from './Line';
import api from '../api';

const fetchLink = async (url) => {
  const { data } = await api.get(`/api/metadata?url=${url}`);
  console.log('url metadata ', data);
  return data;
};

function RaffleCard({ raffle }) {
  const { data: linkdata, isLoading, error } = useQuery(['url', raffle.url], () => fetchLink('https://www.sizelaunches.com'));
  const [ref, { height }] = useMeasure();

  return (
    <div className="p-4 bg-white/10 h-auto">
      <div className="flex">
        <div style={{ width: height, height }} className="rounded-md border-white overflow-hidden border-2">
          { isLoading ? <div>Loading...</div> : <img style={{ width: height, height }} src={linkdata.ogImage} alt="sdksdk" />}

        </div>
        <div ref={ref} className=" ml-4">
          <div className="">
            <h4 className="font-semibold text-lg text-gray-900">
              {' '}
              { isLoading ? <div>Loading...</div> : (
                <h4>
                  {linkdata
                    .title}
                </h4>
              )}
            </h4>
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

          </div>
          {/* <div className="">
            go to raffle !
          </div> */}
        </div>
      </div>

      <LineComponent number={50} />
    </div>

  );
}

export default RaffleCard;
