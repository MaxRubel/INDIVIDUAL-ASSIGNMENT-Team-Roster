import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function PlayerCard({ playerObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={playerObj.image} height="200px" />
      <Card.Body>
        <Card.Title>{playerObj.name}</Card.Title>
        <Card.Text>{playerObj.role}</Card.Text>
        <Button variant="primary">Edit Player</Button>
      </Card.Body>
    </Card>
  );
}
PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
