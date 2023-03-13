const Task = require('../models/task');
const express = require('express');
const router = express.Router();
const { auth } = require('../auth');

router.post('/', auth, async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  } catch (error) {}
});

module.exports = router;
