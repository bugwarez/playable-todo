import * as React from 'react';
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  const { id, title, description, isDone, owner, image, tags, createdAt } =
    data.props;

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
    id,
    title,
    description,
    isDone,
    owner,
    image,
    tags,
    createdAt,
  };

  return (
    <>
      <EditDialog {...state} />
      <Card sx={{ maxWidth: 345, border: '2px solid #e3e3e3' }}>
        <CardMedia sx={{ height: 140 }} image={image} title={title} />
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
            {createdAt.toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            tarihinde oluşturuldu
          </Typography>
          <Stack direction='row' spacing={1}>
            {tags.map((tag) => {
              return (
                <Chip
                  color={colors[Math.floor(Math.random() * colors.length)]}
                  label={tag}
                  variant='contained'
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

          <Button
            variant='outlined'
            color='success'
            onClick={() => {
              console.log(id, isDone);
            }}
            size='small'
          >
            Mark as Done
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
