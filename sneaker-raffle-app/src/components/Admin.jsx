import React, {
  useState, useEffect, useMemo, useRef,
} from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SneakerForm from './SneakerForm';
import RaffleForm from './RaffleForm';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../grid-styles.css';

import api from '../api';
import useUser from '../hooks/useUser';

const fetchSneakers = async () => {
  const { data } = await api.get('/api/sneakers'); // Replace with your endpoint
  console.log(data, 'sneakerssssssss');
  return data;
};
const fetchRaffles = async () => {
  const { data } = await api.get('/api/raffles');
  console.log(data, 'rafflessssss');

  return data;
};
const deleteSneaker = async (id) => {
  await api.delete(`/api/sneakers/${id}`);
};

const deleteRaffle = async (id) => {
  await api.delete(`/api/raffles/${id}`);
};

function DeleteButtonRenderer({ data, onDelete }) {
  return (
    <button
      type="button"
      className="bg-red-500 text-white text-xs p-1 rounded hover:bg-red-600"
      onClick={() => onDelete(data.id)}
    >
      Delete
    </button>
  );
}

function Admin() {
  const queryClient = useQueryClient();
  // const { data: sneakers } = useQuery('sneakers', fetchSneakers, {
  //     onSuccess: () => {
  //         sneakerGridRef.current.api.sizeColumnsToFit();
  //     }
  // });
  const { data: sneakers } = useQuery('sneakers', fetchSneakers);

  // const { data: raffles } = useQuery('raffles', fetchRaffles, {
  //     onSuccess: () => {
  //         // raffleGridRef.current.api.sizeColumnsToFit();
  //         return
  //     }
  // });
  const { data: raffles } = useQuery('raffles', fetchRaffles);

  const navigate = useNavigate();
  const { user } = useUser();
  const sneakerGridRef = useRef(null);
  const raffleGridRef = useRef(null);

  const deleteSneakerMutation = useMutation(deleteSneaker, {
    onSuccess: () => {
      queryClient.invalidateQueries('sneakers');
      toast.success('Sneaker deleted successfully');
    },
    onError: () => {
      toast.error('An error occurred while deleting the sneaker');
    },
  });

  const deleteRaffleMutation = useMutation(deleteRaffle, {
    onSuccess: () => {
      queryClient.invalidateQueries('raffles');
      toast.success('Raffle deleted successfully');
    },
    onError: () => {
      toast.error('An error occurred while deleting the raffle');
    },
  });

  const [activeTab, setActiveTab] = useState('sneakerForm');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const sneakerColumnDefs = useMemo(() => [
    {
      headerName: 'ID', field: 'id', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Name', field: 'name', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Brand', field: 'brand', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Release Date', field: 'releaseDate', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Image URL', field: 'imageUrl', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: DeleteButtonRenderer,
      cellRendererParams: { onDelete: deleteSneakerMutation.mutate },
    },
  ], [deleteSneakerMutation]);

  const raffleColumnDefs = useMemo(() => [
    {
      headerName: 'ID', field: 'id', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Sneaker', field: 'sneaker.name', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Name', field: 'name', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Region', field: 'region', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Type', field: 'type', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Entry Method', field: 'entryMethod', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'End Date', field: 'endDate', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Is Shipped', field: 'isShipped', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'URL', field: 'url', sortable: true, filter: true, resizable: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: DeleteButtonRenderer,
      cellRendererParams: { onDelete: deleteRaffleMutation.mutate },
    },
  ], [deleteRaffleMutation]);

  return (
    <div className="space-y-8">

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10">Admin Panel</h1>
        <div>
          <div className="mb-6 flex justify-center space-x-4">
            <button
              type="button"
              className={`px-3 py-2 ${activeTab === 'sneakerForm' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}
              onClick={() => handleTabChange('sneakerForm')}
            >
              Add Sneaker
            </button>
            <button
              type="button"
              className={`px-3 py-2 ${activeTab === 'raffleForm' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}
              onClick={() => handleTabChange('raffleForm')}
            >
              Add Raffle
            </button>
            <button
              type="button"
              className={`px-3 py-2 ${activeTab === 'sneakerList' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}
              onClick={() => handleTabChange('sneakerList')}
            >
              Sneakers List
            </button>
            <button
              type="button"
              className={`px-3 py-2 ${activeTab === 'raffleList' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}
              onClick={() => handleTabChange('raffleList')}
            >
              Raffles List
            </button>
          </div>

          {activeTab === 'sneakerForm' && <SneakerForm />}
          {activeTab === 'raffleForm' && sneakers && <RaffleForm sneakers={sneakers} raffles={raffles} />}
          {activeTab === 'sneakerList'
                        && (
                        <div className="ag-theme-alpine" style={{ width: '100%' }}>
                          <h2 className="text-2xl font-bold">Sneakers</h2>
                          <AgGridReact
                            ref={sneakerGridRef}
                            columnDefs={sneakerColumnDefs}
                            rowData={sneakers}
                            domLayout="autoHeight"
                            onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
                          />
                        </div>
                        )}
          {activeTab === 'raffleList'
                        && (
                        <div className="ag-theme-alpine" style={{ width: '100%' }}>
                          <h2 className="text-2xl font-bold">Raffles</h2>
                          <AgGridReact
                            ref={raffleGridRef}
                            columnDefs={raffleColumnDefs}
                            rowData={raffles}
                            domLayout="autoHeight"
                          />
                        </div>
                        )}
        </div>
      </div>

      {/* <SneakerForm /> */}
      {/* {sneakers && <RaffleForm sneakers={sneakers} raffles={raffles} />} */}

      {/* <div className="ag-theme-alpine" style={{ width: '100%' }}>
                <h2 className="text-2xl font-bold">Sneakers</h2>
                <AgGridReact
                    ref={sneakerGridRef}
                    columnDefs={sneakerColumnDefs}
                    rowData={sneakers}
                    domLayout='autoHeight'
                    onFirstDataRendered={params => params.api.sizeColumnsToFit()}

                />
            </div>

            <div className="ag-theme-alpine" style={{ width: '100%' }}>
                <h2 className="text-2xl font-bold">Raffles</h2>
                <AgGridReact
                    ref={raffleGridRef}
                    columnDefs={raffleColumnDefs}
                    rowData={raffles}
                    domLayout='autoHeight'
                // onFirstDataRendered={params => params.api.sizeColumnsToFit()}

                />
            </div> */}
    </div>
  );
}

export default Admin;
