import { TextField, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userService';

function Register() {
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const register = async () => {
    console.log('registered in with', values);
    const response = await registerUser(values);

    console.log('response', response);

    if (response.status === 400) {
      setError(response.data);
    }

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '35vw',
          height: '70vh',
          padding: 3,
          borderRadius: 5,
          border: '2px solid #E5E7E7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        gap={3}
      >
        <TextField
          value={values.fullname}
          onChange={handleInputChange}
          id='fullname'
          name='fullname'
          label='İsim Soyisim'
          variant='outlined'
        />
        <TextField
          value={values.email}
          onChange={handleInputChange}
          id='email'
          name='email'
          label='E-Posta'
          variant='outlined'
        />
        <TextField
          type='password'
          value={values.password}
          onChange={handleInputChange}
          id='password'
          name='password'
          label='Çok gizli şifren'
          variant='outlined'
        />
        <Button
          onClick={() => {
            register().then(() => {
              navigate('/dashboard');
            });
          }}
          variant='outlined'
        >
          Kayıt Ol
        </Button>
        <Button
          color='success'
          onClick={() => {
            navigate('/login');
          }}
          variant='outlined'
        >
          Giriş Yap
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
