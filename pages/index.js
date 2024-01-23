import PlayerForm from '../components/forms/PlayerForm';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        color: 'white',
        caretColor: 'transparent',
      }}
    >
      waddup
    </div>
  );
}

export default Home;
