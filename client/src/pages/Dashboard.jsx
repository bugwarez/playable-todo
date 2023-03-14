import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//!Components
import Navbar from '../components/Navbar';
import { Box, Stack, Button, TextField } from '@mui/material';
import TodoCard from '../components/TodoCard';
import NewDialog from '../components/NewDialog';
import { getCard } from '../services/taskService';

function Dashboard() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const state = {
    open,
    handleClickOpen,
    handleClose,
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user', user._id);

  //!Axios
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    getCard('64106cd74f918e0cb0e7fd66').then((result) => {
      setDataState(result);
    });
  }, []);

  console.log('dataState', dataState);

  return (
    <>
      <Navbar />
      <NewDialog {...state} />
      <TextField
        id='search'
        label='Search'
        variant='outlined'
        name='search'
        sx={{
          width: '50vw',
          marginTop: 5,
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          // background: 'red',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
            height: '100%',
            padding: 5,
          }}
        >
          <Stack direction='column'>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <h1>To Do</h1>

              <Button
                color='primary'
                onClick={handleClickOpen}
                variant='outlined'
                sx={{
                  marginBottom: 2,
                }}
              >
                New Card
              </Button>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
              gap={2}
            >
              {dataState.map((data, index) => {
                const props = {
                  data,
                  index,
                };
                return <TodoCard key={index} props={props} />;
              })}
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
            height: '100%',
            padding: 5,
            textAlign: 'start',
          }}
        >
          <Stack direction='column'>
            <h1> Done</h1>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
              gap={2}
            >
              {/* {exampleData.map((data, i) => {
                return <TodoCard key={i} props={(data, i)} />;
              })} */}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
