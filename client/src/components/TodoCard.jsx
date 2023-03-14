import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//!Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditDialog from './EditDialog';

import { setComplete, setIncomplete } from '../services/taskService';

export default function TodoCard(data) {
  const colors = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ];

  //!Destructuring data
  const {
    _id,
    title,
    description,
    completed,
    owner,
    thumbnail,
    tags,
    createdAt,
  } = data.props.data;

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
    _id,
    title,
    description,
    completed,
    owner,
    thumbnail,
    tags,
    createdAt,
  };

  return (
    <>
      <EditDialog {...state} />
      <Card sx={{ width: 250, border: '2px solid #e3e3e3', margin: 2 }}>
        <CardMedia
          sx={{ height: 140 }}
          component='img'
          image={thumbnail}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            {description}
          </Typography>
          <hr />
          <Typography
            textAlign={'start'}
            variant='body2'
            color='text.secondary'
          >
            {new Date(createdAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            &nbsp;tarihinde oluşturuldu
          </Typography>
          <Stack direction='row' spacing={1}>
            {tags.map((tag) => {
              return (
                <Chip
                  color={'primary'}
                  label={tag}
                  variant='outlined'
                  size='small'
                />
              );
            })}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            color='error'
            onClick={handleClickOpen}
            size='small'
          >
            Edit
          </Button>

          {completed ? (
            <Button
              variant='outlined'
              color='success'
              onClick={() => {
                setIncomplete(_id, false).then(() => {
                  setCardState(true);
                });
              }}
              size='small'
            >
              Mark as Incomplete
            </Button>
          ) : (
            <Button
              variant='outlined'
              color='success'
              onClick={() => {
                setComplete(_id).then(() => {
                  setCardState(true);
                });
              }}
              size='small'
            >
              Mark as Complete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}
