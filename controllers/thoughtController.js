const { User, Thought } = require('../models');

// Get routes
const getThoughts = async (req, res) => {
  try {
 const thoughtData = await Thought.find().select('-__v').populate('reactions', '-__v -_id')
 !thoughtData
 ? res.status(400).json({ message: 'No thoughts found' })
 : res.status(200).json(thoughtData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
};

const getSingleThought = async (req, res) => {
  try {
    const thoughtData = await Thought.findOne(
      { _id: req.params.thoughtId }
      ).select('-__v').populate('reactions', '-__v -_id')

    !thoughtData
    ? res.status(400).json({ message: 'No user with that ID' })
    : res.status(200).json(thoughtData)

     } catch (err) {
       console.error(err)
       res.status(500).json(err)
     }
};

// Create route
const createThought = async (req, res) => {
  try {
    const newThoughtData = await Thought.findOneAndUpdate(
      { username: Thought.username },
      { $push: { thoughts: Thought._id } },
      { new: true }
    )

    !newThoughtData
    ? res.status(400).json({ message: 'Oops something went wrong, make sure data entered is valid' })
    : res.status(200).json(newThoughtData)

     } catch (err) {
       console.error(err)
       res.status(500).json(err)
     }
};

// Delete route 
const deleteThought = async (req, res) => {
  try {
    const deleteThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

    !deleteThoughtData
    ? res.status(400).json({ message: 'No such thought exists'})
    : res.status(200).json({ message: 'Thought succesfully deleted'})

      } catch (err) {
        console.error(err)
        res.status(500).json(err)
      }
};

// Update route
const updateThought = async (req, res) => {
  try {
    const updateThoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )

    !updateThoughtData
    ? res.status(400).json({ message: 'No such thought exists' })
    : res.status(200).json(updateThoughtData)

     } catch (err) {
       console.error(err)
       res.status(500).json(err)
     }
};

// Create reaction route
const createReaction = async (req, res) => {
  try {
    const newReactionData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )

    !newReactionData
    ? res.status(400).json({ message: 'Oops something went wrong, make sure data entered is valid' })
    : res.status(200).json(newReactionData)

     } catch (err) {
       console.error(err)
       res.status(500).json(err)
     }
};

// Delete reaction route
// /api/thoughts/:thoughtId/reactions/:reactionId
const deleteReaction = async (req, res) => {
  try {
    const deleteReactionData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {
        // for subdocuments, the array.property needs to be explicity mentioned
        // unable to delete the seeded (1st) reaction object
        "reactionId": req.params.reactionId
      } } },
      { runValidators: true, new: true }
    )
    !deleteReactionData
    ? res.status(400).json({ message: 'No such reaction exists'})
    : res.status(200).json(deleteReactionData)

  } catch (err) {
       console.error(err)
       res.status(500).json(err)
     }
};

module.exports = { getThoughts, getSingleThought, createThought, deleteThought, updateThought, createReaction, deleteReaction };