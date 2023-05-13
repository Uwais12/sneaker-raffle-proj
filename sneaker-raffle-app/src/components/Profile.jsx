import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Raffle from './Raffle';

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="white bg-white">
      <h1>
        Welcome,
        {' '}
        {user.email}
        {user.id}
        {/* {console.log('thdiididididi', user.rafflesEntered.length > 0)} */}
        !
      </h1>
      <h2>Your Raffles</h2>

      dsd
      {/* {/* {user.rafflesEntered.length > 0 ? <div>Yes</div> : <div>No</div>} */}
      {user.rafflesEntered > 0 ? (
        user.rafflesEntered.map((raffle) => <Raffle key={raffle.id} raffle={raffle} />)
      ) : (
        <p>You haven not entered any raffles yet.</p>
      )}
    </div>
  );
}

export default Profile;
