/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPlayer, updatePlayer } from '../../api/players';
import { useAuth } from '../../utils/context/authContext';
import { getUserTeams } from '../../api/teams';

const initialValue = {
  name: '',
  image: '',
  role: '',
  teamId: '',
};

export default function PlayerForm({ playerObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialValue);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getUserTeams(user.uid).then((data) => {
      setTeams(data);
    });
  }, []);

  useEffect(() => {}, [formValues]);

  useEffect(() => {
    if (playerObj) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        ...playerObj,
      }));
    } else {
      setFormValues(initialValue);
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

    if (!playerObj) {
      createPlayer({ ...formValues, userID: user.uid }).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayer(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    } else {
      updatePlayer({ ...formValues, firebaseKey: playerObj.firebaseKey }).then(
        () => {
          router.push('/teams');
        }
      );
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} style={{ marginTop: '8%' }}>
        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            marginBottom: '4%',
            caretColor: 'transparent',
          }}
        >
          {playerObj ? 'Edit Player' : 'Add A Player'}
        </h1>
        <FloatingLabel controlId='nameInput' label='Name' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter a name'
            name='name'
            onChange={handleChange}
            value={formValues.name}
            autoComplete='name'
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId='imageURL' label='Image' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter an image URL'
            name='image'
            onChange={handleChange}
            value={formValues.image}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId='role' label='Role' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Role'
            name='role'
            onChange={handleChange}
            value={formValues?.role}
            required
          />
        </FloatingLabel>

        <div>
          <Form.Select
            name='teamId'
            onChange={handleChange}
            value={formValues.teamId}
          >
            <option value='value'>Assign a Team</option>
            {teams.map((team) => (
              <option key={team.firebaseKey} value={team.firebaseKey}>
                {team.team_name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            type='submit'
            style={{
              marginTop: '4%',
              width: '50%',
              backgroundColor: '#833ab4',
              border: 'none',
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
// Define prop types for PlayerForm
// PlayerForm.propTypes = {
//   playerObj: PropTypes.shape({
//     firebaseKey: PropTypes.string, // Assuming firebaseKey is a string
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     role: PropTypes.string.isRequired,
//     teamId: PropTypes.string.isRequired,
//   }),
// };
