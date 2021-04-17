const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  // name: {
  //   type: String,
  //   trim: true,
  //   required: "Enter a name for transaction"
  // },
  // value: {
  //   type: Number,
  //   required: "Enter an amount"
  // },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
  day: {
    type: Date,
    default: Date.now
  },
  exercises: {
  type: {
    type: String,
    required: "type of workout is Required"
  },

  name: {
    type: String,
    required: "Name of workout is Required"
  },

  duration: {
    type: Number,
  },

  weight: {
    type: Number,
  },

  reps: {
    type: Number,
  },
  sets: {
    type: Number,
  },

  distance: {
    type: Number,
  },

 
  }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
