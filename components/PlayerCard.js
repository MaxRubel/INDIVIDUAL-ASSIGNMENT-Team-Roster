import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deletePlayer } from '../api/players';
import React from 'react';

export default function PlayerCard({ playerObj }) {
  const router = useRouter();

  const handleDelete = () => {
    if (
      window.confirm('Are you totes sure you would like to delete this player?')
    ) {
      deletePlayer(playerObj.firebaseKey).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Card style={{ width: '17rem', margin: '6px 0px' }}>
      <Card.Img variant='top' src={playerObj.image} height='200px' />
      <Card.Body>
        <Card.Title>{playerObj.name}</Card.Title>
        <Card.Text>{playerObj.role}</Card.Text>
        <div id='buttonRow'>
          <Button
            style={{ margin: '6px', width: '100px' }}
            variant='primary'
            onClick={() => {
              router.push(`player/edit/${playerObj.firebaseKey}`);
            }}
          >
            Edit Player
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete Player
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
