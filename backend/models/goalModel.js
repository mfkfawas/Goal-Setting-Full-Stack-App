const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value.'],
    },
  },

  //schema options:
  {
    //create an 'updatedAt' & 'createdAt' field automatically.
    timestamps: true,
  }
);

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
