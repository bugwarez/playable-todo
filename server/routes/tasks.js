const Task = require('../models/task');
const express = require('express');
const router = express.Router();
const { auth } = require('../auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './client/public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post('/', upload.single('thumbnail'), async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.get('/complete/:id', async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.params.id,
      completed: true,
    });
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.get('/incomplete/:id', async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.params.id,
      completed: false,
    });
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req, res) => {
  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateTask);
});

router.put('/setComplete/:id', async (req, res) => {
  const updateTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      completed: true,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updateTask);
});
router.put('/setIncomplete/:id', async (req, res) => {
  const updateTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      completed: false,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updateTask);
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  } catch (error) {}
});

module.exports = router;
