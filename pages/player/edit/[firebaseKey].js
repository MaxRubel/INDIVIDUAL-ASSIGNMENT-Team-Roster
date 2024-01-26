import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePlayer } from '../../../api/players';
import PlayerForm from '../../../components/forms/PlayerForm';
import React from 'react';

export default function EditPlayer() {
  const [player, setPlayer] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSinglePlayer(firebaseKey).then((data) => {
      setPlayer(data);
    });
  }, []);

  return <PlayerForm playerObj={player} />;
}
