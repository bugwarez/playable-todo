import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//!Components
import Navbar from '../components/Navbar';
import { Box, Stack, Button, TextField, Grid, Typography } from '@mui/material';
import TodoCard from '../components/TodoCard';
import NewDialog from '../components/NewDialog';
import { getCard, getCardIncomplete } from '../services/taskService';
import EditDialog from '../components/EditDialog';

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
  }, [dataState, incompleteTasks]);

  //!Searchbar

  const [query, setQuery] = useState('');

  const allTasks = dataState.concat(incompleteTasks);

  const sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds);
    });
  };

  const highlight = async (id) => {
    document.getElementById(id).style.border = '2px solid red';
    await sleep(3000);
    document.getElementById(id).style.border = 'none';
  };

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
          <Stack
            sx={{
              width: '100%',
            }}
            direction='column'
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                height: 'fit-content',
                // background: 'red',
                width: '100%',
              }}
            >
              <h1>To Do</h1>

              <Button
                color='primary'
                onClick={handleClickOpen}
                variant='outlined'
                sx={{
                  marginBottom: 0,
                  marginLeft: 2,
                }}
              >
                New Card
              </Button>
            </Box>
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
                        <Grid key={index} item md={6}>
                          <Box
                            id={data._id}
                            sx={{
                              width: 'fit-content',
                              height: 'fit-content',
                            }}
                          >
                            <TodoCard id={data._id} key={index} props={props} />
                          </Box>
                        </Grid>
                      ) : (
                        <Grid id={data._id} key={index} item md={4}>
                          <Box
                            id={data._id}
                            sx={{
                              width: 'fit-content',
                              height: 'fit-content',
                            }}
                          >
                            <TodoCard id={data._id} key={index} props={props} />
                          </Box>
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
                        <Grid key={index} item md={6}>
                          <Box
                            id={data._id}
                            sx={{
                              width: 'fit-content',
                              height: 'fit-content',
                            }}
                          >
                            <TodoCard id={data._id} key={index} props={props} />
                          </Box>
                        </Grid>
                      ) : (
                        <Grid key={index} item md={4}>
                          <Box
                            id={data._id}
                            sx={{
                              width: 'fit-content',
                              height: 'fit-content',
                            }}
                          >
                            <TodoCard id={data._id} key={index} props={props} />
                          </Box>
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
      <hr />

      <Box
        sx={{
          width: '100%',
          // background: 'red',
          height: '15vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
        }}
      >
        <Box
          sx={{
            width: '50%',
            // background: 'green',
            height: '15vh',
          }}
        >
          <TextField
            id='search'
            label='Search'
            variant='outlined'
            name='search'
            sx={{
              width: '50vw',
              marginTop: 5,
            }}
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          />

          {allTasks
            .filter((card) => {
              if (!query) {
                return;
              } else if (
                card.title.toLowerCase().includes(query.toLowerCase())
              ) {
                return card;
              } else if (
                query.includes('tag:') &&
                card.tags.map((element) => {
                  return element.toLowerCase().includes(query.toLowerCase());
                })
              ) {
                return card;
              }
            })
            .map((card, index) => (
              <Box
                onClick={() => {
                  highlight(card._id);
                }}
                sx={{
                  padding: 0,
                  border: '1px solid black',
                  borderRadius: 2,
                  position: 'relative',
                  background: 'white',
                }}
                className='box'
                key={card._id}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* <Typography variant='body2'>{card._id}</Typography> */}
                    <Typography gutterBottom variant='body2'>
                      {card.title}
                    </Typography>
                    <Typography gutterBottom variant='body2'>
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
