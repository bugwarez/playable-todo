import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//!Components
import Navbar from '../components/Navbar';
import { Box, Stack, Button, TextField, Grid } from '@mui/material';
import TodoCard from '../components/TodoCard';
import NewDialog from '../components/NewDialog';
import { getCard, getCardIncomplete } from '../services/taskService';

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

  //!Axios
  const [dataState, setDataState] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    getCard(user._id).then((result) => {
      setDataState(result);
    });
    getCardIncomplete(user._id).then((result) => {
      setIncompleteTasks(result);
    });
  });

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
              <Grid container spacing={0}>
                {incompleteTasks.map((data, index) => {
                  const props = {
                    data,
                    index,
                  };

                  return (
                    <>
                      {incompleteTasks.length % 2 === 0 ? (
                        <Grid item md={6}>
                          <TodoCard key={index} props={props} />
                        </Grid>
                      ) : (
                        <Grid item md={4}>
                          <TodoCard key={index} props={props} />
                        </Grid>
                      )}
                    </>
                  );
                })}
              </Grid>
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
          }}
        >
          <Stack direction='column'>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <h1>Done</h1>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
              gap={2}
            >
              <Grid container spacing={0}>
                {dataState.map((data, index) => {
                  const props = {
                    data,
                    index,
                  };

                  return (
                    <>
                      {dataState.length % 2 === 0 ? (
                        <Grid item md={6}>
                          <TodoCard key={index} props={props} />
                        </Grid>
                      ) : (
                        <Grid item md={4}>
                          <TodoCard key={index} props={props} />
                        </Grid>
                      )}
                    </>
                  );
                })}
              </Grid>
              {/* {dataState.map((data, index) => {
                const props = {
                  data,
                  index,
                };
                return <TodoCard key={index} props={props} />;
              })} */}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
