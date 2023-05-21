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

function getBaseUrl(url) {
  const matches = url.match(/^https?:\/\/[^/?#]+/);
  return matches ? matches[0] : url;
}

function RaffleCard({ raffle }) {
  const chipStyle = 'bg-gray-500 text-white rounded-md px-2';
  const chipStyleReg = 'bg-green-600 text-white rounded-md px-2';

  const baseUrl = getBaseUrl(raffle.url || 'https://www.footpatrol.com/dlkfksf/fddfoif');

  const { data: linkdata, isLoading, error } = useQuery(['url', raffle.url], () => fetchLink(baseUrl || raffle.url));
  const [ref, { height }] = useMeasure();

  return (
    <div className="p-4 bg-white/10 h-auto">
      <div className="flex ">
        <div style={{ width: height, height }} className="rounded-md border-white overflow-hidden border-2">
          { isLoading ? <div>Loading...</div> : <img style={{ width: height, height }} src={linkdata.ogImage || linkdata.favicon} alt="sdksdk" />}

        </div>
        <div ref={ref} className=" ml-4 flex justify-between w-full h-full ">
          <div className=" flex-col">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              {' '}
              { isLoading ? <div>Loading...</div> : (
                <h4>
                  {raffle
                    .name}
                </h4>
              )}
            </h4>
            <div className="flex gap-2">
              <div className={chipStyle}>{raffle.isShipped ? 'Shipped Online' : 'Collection Instore'}</div>
              <div className={chipStyle}>{raffle.entryMethod}</div>
              <div className={chipStyleReg}>{raffle.region}</div>

            </div>

          </div>
          <div className="flex items-center align-middle  ">
            <a href={raffle.url} className="bg-black text-white rounded-md p-2">Enter Now</a>
          </div>

        </div>
      </div>

      <LineComponent number={50} />
    </div>

  );
}

export default RaffleCard;
