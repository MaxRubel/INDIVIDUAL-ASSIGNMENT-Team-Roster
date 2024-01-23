import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePlayer } from '../../../api/players';
import PlayerForm from '../../../components/forms/PlayerForm';

export default function EditPlayer() {
  const [player, setPlayer] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSinglePlayer(firebaseKey).then((data) => {
      setPlayer(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<PlayerForm playerObj={player} />);
}
