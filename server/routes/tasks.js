const Task = require('../models/task');
const express = require('express');
const router = express.Router();
const { auth } = require('../auth');

router.post('/', async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.params.id,
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

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  } catch (error) {}
});

module.exports = router;
