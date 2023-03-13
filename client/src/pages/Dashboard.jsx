import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//!Components
import Navbar from '../components/Navbar';
import { Box, Stack, Button } from '@mui/material';
import TodoCard from '../components/TodoCard';
import NewDialog from '../components/NewDialog';
import { getTasks } from '../services/taskService';

function Dashboard() {
  const exampleData = [
    {
      id: 0,
      title: 'Get in Playable Factory',
      description: 'Hope i will',
      isDone: true,
      owner: 112,
      image:
        'https://playablefactory.com/wp-content/uploads/2022/01/animated_dark_with_title_logo_pf.gif',
      tags: ['job', 'hired'],
      createdAt: new Date(),
    },
    {
      id: 1,
      title: 'Develop wonderful things',
      description: 'still Developing',
      isDone: false,
      owner: 112,
      image:
        'https://playablefactory.com/wp-content/uploads/2022/01/anim1_dark_gear.gif',
      tags: ['tasks', 'important'],
      createdAt: new Date(),
    },
  ];

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

  //!Axios
  const [dataState, setDataState] = useState();

  useEffect(() => {
    const loadData = async () => {
      const result = await getTasks();
      setDataState(result);
    };

    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <NewDialog {...state} />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
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
              {exampleData.map((data) => {
                return <TodoCard props={data} />;
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
              {exampleData.map((data) => {
                return <TodoCard props={data} />;
              })}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
