const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");


//HTML routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});


//API routes

router.post('/api/workouts', async(req, res) => {
  try {
      let result = await Workout.create({});
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.put('/api/workouts/:id', async(req, res) => {
  try {
      let { body } = req;
      let { id } = req.params;
      let result = await Workout.findByIdAndUpdate(id, { $push: { exercises: body } }, { new: true, runValidators: true })
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/api/workouts', async(req, res) => {
  try {
      let { id } = req.body
      let result = Workout.findByIdAndDelete(id)
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});
// .aggregate() is a robost version of .find()
router.get('/api/workouts', async(req, res) => {
  try {
      let result = await Workout.aggregate([
          { $addFields: { totalDuration: { $sum: '$exercises.duration', }, }, },
      ])
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});


//stats page!
router.get('/api/workouts/range', async(req, res) => {

  try {
      let result = await Workout.aggregate([
              { $addFields: { totalDuration: { $sum: '$exercises.duration', }, }, },
          ])
          .sort({ _id: -1 })
          .limit(7);
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
