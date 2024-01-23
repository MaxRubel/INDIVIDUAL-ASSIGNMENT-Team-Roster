import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUserPlayers } from '../api/players';
import PlayerCard from './PlayerCard';

export default function TeamView() {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    getUserPlayers(user.uid).then((data) => {
      setPlayers(data);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2%' }}>
      {players.map((player) => <PlayerCard key={player.id} playerObj={player} />)}
    </div>
  );
}
