import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../../api/players';
import { useAuth } from '../../utils/context/authContext';

const initialValue = {
  name: '',
  image: '',
  role: '',
};

export default function PlayerForm({ playerObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formValues, setFormValues] = useState({ ...initialValue, userID: user.uid });
  console.log(playerObj);
  useEffect(() => {
    if (playerObj.firebaseKey) {
      console.log(playerObj);
      setFormValues(playerObj);
    }
  }, [playerObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerObj.firebaseKey) {
      createPlayer(formValues)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updatePlayer(patchPayload).then(() => {
            router.push('/team');
          });
        });
    } else {
      updatePlayer({ ...formValues, firebaseKey: playerObj.firebaseKey }).then(() => { router.push('/'); });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} style={{ marginTop: '8%' }}>
        <h1 style={{
          color: 'white', textAlign: 'center', marginBottom: '4%', caretColor: 'transparent',
        }}
        >Add A Member
        </h1>
        <FloatingLabel controlId="name" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a name"
            name="name"
            onChange={handleChange}
            value={formValues.name}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="imageURL" label="Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter an image URL"
            name="image"
            onChange={handleChange}
            value={formValues.image}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="role" label="Role" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Role"
            name="role"
            onChange={handleChange}
            value={formValues.role}
            required
          />
        </FloatingLabel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button type="submit" style={{ width: '50%', backgroundColor: '#833ab4', border: 'none' }}>Submit</Button>
        </div>
      </Form>
    </>
  );
}
// Define prop types for PlayerForm
PlayerForm.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string, // Assuming firebaseKey is a string
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
};

// Set default props for PlayerForm
PlayerForm.defaultProps = {
  playerObj: initialValue,
};
