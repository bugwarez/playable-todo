import { TextField, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { loginUser } from '../services/userService';

import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
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
  const navigate = useNavigate();

  const login = async () => {
    console.log('logged in with', values);

    const response = await loginUser(values);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  };
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
          value={values.email}
          onChange={handleInputChange}
          id='email'
          name='email'
          label='E-Posta'
          variant='outlined'
        />
        <TextField
          value={values.password}
          onChange={handleInputChange}
          id='password'
          name='password'
          label='Çok gizli şifren'
          variant='outlined'
          type={'password'}
        />
        <Button
          onClick={() => {
            login().then(() => {
              navigate('/dashboard');
            });
          }}
          variant='outlined'
        >
          Giriş Yap
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
