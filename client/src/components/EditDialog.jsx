import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { updateCard, deleteCard } from '../services/taskService';

function EditDialog(state) {
  // console.log('EditDialog state', state);
  // console.log('EditDialog state.title', state.title);

  const user = JSON.parse(localStorage.getItem('user'));

  //!Tags
  const [tags, setTags] = useState(state.tags);

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  //!File upload with preview
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(state.image);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);

  //!File Upload
  const [attachment, setAttachment] = useState(state.attachment);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachment(e.target.files[0]);
    }
  };

  const formState = {
    imageUrl,
    selectedImage,
    thumbnail: imageUrl,
    tags,
    title,
    description,
    attachment,
  };

  const editCard = async () => {
    const response = await updateCard(state._id, {
      ...formState,
      updatedAt: new Date(),
    });

    return response.data;
  };

  const delCard = async () => {
    const response = await deleteCard(state._id);

    return response.data;
  };

  return (
    <Dialog
      maxWidth='md'
      fullWidth
      open={state.open}
      onClose={() => {
        state.handleClose(), setImageUrl(null);
      }}
    >
      <DialogTitle>Editing "{state.title}" card</DialogTitle>
      <DialogContent
        sx={{
          height: '550px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          //   background: 'red',
        }}
      >
        <>
          {imageUrl && selectedImage && (
            <Box
              sx={{
                // background: 'red',
                width: '100%',
              }}
              mt={2}
              textAlign='center'
            >
              <div>Image Preview:</div>
              <img src={imageUrl} alt={selectedImage.name} height='100px' />
            </Box>
          )}
        </>
        <Box
          sx={{
            padding: 1,
          }}
        >
          <Box sx={{ m: 1 }}>
            <input
              accept='image/*'
              type='file'
              id='select-image'
              style={{ display: 'none' }}
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor='select-image'>
              <Button variant='outlined' color='primary' component='span'>
                Upload Image
              </Button>
            </label>
          </Box>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              display: 'flex',
              flexDirection: 'row',
            }}
            noValidate
            autoComplete='off'
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                id='outlined-basic'
                name='title'
                label='Title'
                variant='outlined'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                id='outlined-multiline-static'
                label='Multiline'
                multiline
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <label htmlFor='attachment'>Attachment:</label>

              <input type='file' id='attachment' name='attachment' />
            </Box>
            <Box
              sx={{
                border: '2px solid #e3e3e3',
                padding: '0.5em',
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5em',
              }}
            >
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant='outlined'
                  onDelete={() => removeTag(index)}
                />
              ))}
              <TextField
                InputLabelProps={{ shrink: true }}
                onKeyDown={handleKeyDown}
                type='text'
                sx={{
                  outline: 'none',
                  padding: '0.5em, 0',
                  flexGrow: 1,
                  border: 0,
                }}
                placeholder={tags.length == 4 ? 'Max 4 Tag Allowed' : 'Tags'}
                disabled={tags.length == 4 ? true : false}
                helperText={'Press enter to add tag after you type'}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          color='error'
          onClick={() => {
            state.handleClose();
            delCard();
          }}
        >
          Delete
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            state.handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            editCard();
            state.handleClose();
          }}
        >
          Edit Card
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
