import React from 'react';

function LineComponent({
  number,
  monthOpen,
  dateOpen,
  monthClose,
  dateClose,
}) {
  return (
    <div className="flex justify-center align-middle items-center mt-2">
      <div className="bg-black text-white rounded-md text-center font-bold p-1 text-sm whitespace-nowrap">JAN 25</div>

      <div className="flex items-center w-full">
        <div
          className="flex-1 h-1.5  bg-slate-500 border-slate-500 "
        />

        <div
          style={{
          }}
          className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-sm text-black border-2 border-black bg-white"
        />

        <div className={`flex-1 h-1 ${number < 100 ? 'dashed-line ' : 'bg-green-500'}`} />

      </div>
      <div className="text-zinc-800 rounded-md text-center font-bold p-1 text-sm border-zinc-800 border-2 whitespace-nowrap">JAN 25</div>

    </div>
  );
}

export default LineComponent;
