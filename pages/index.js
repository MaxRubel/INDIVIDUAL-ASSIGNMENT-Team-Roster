import TeamView from '../components/TeamView';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2%',
      }}
    >
      <TeamView />
    </div>
  );
}

export default Home;
