import { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createNewTeam, updateTeam } from '../../api/teams';
import { useAuth } from '../../utils/context/authContext';
import React from 'react';

export default function TeamForm() {
  const { user } = useAuth();
  const [formValues, setFormValues] = useState({ team_name: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTeam({ ...formValues, userID: user.uid }).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateTeam(patchPayload).then(() => {
        router.push('/teams');
      });
    });
  };

  return (
    <>
      <h1 style={{ color: 'white', marginTop: '2%' }}>Add a Team:</h1>
      <Form style={{ marginTop: '2%' }} onSubmit={handleSubmit}>
        <FloatingLabel controlId='name' label='Name' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter a name'
            name='team_name'
            value={formValues.team_name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  );
}
