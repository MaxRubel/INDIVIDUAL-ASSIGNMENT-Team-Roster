import React, { useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPlayer, updatePlayer } from '../../api/players';
import { useAuth } from '../../utils/context/authContext';

const initialValue = {
  name: '',
  image: '',
  role: '',
};

export default function PlayerForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [formValues, setFormValues] = useState({ ...initialValue, userID: user.uid });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    createPlayer(formValues)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayer(patchPayload).then(() => {
          router.push('/team');
        });
      });
    e.preventDefault();
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
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="imageURL" label="Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter an image URL"
            name="image"
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="role" label="Role" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Role"
            name="role"
            onChange={handleChange}
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
