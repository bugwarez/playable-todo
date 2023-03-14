const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    attachment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('task', taskSchema);
