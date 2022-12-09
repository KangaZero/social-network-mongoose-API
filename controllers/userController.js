// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Get routes
const getUsers = async (req, res) => {
    try {
   const userData = await User.find().select('-__v').populate('friends');

   !userData
   ? res.status(404).json({ message: 'No users found' })
   : res.status(200).json(userData)

    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  };

const getSingleUser = async (req, res) => {
    try {
      const userData = await User.findOne({ _id: req.params.userId }).select('-__v').populate('friends', 'thoughts');

      !userData
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.status(200).json(userData)

       } catch (err) {
         console.error(err)
         res.status(500).json(err)
       }
  };

// Post route 
const createUser = async (req, res) => {
    try {
      const newUserData = await User.create(req.body)

      !newUserData
      ? res.status(400).json({ message: 'Oops something went wrong, make sure data entered is valid'})
      : res.status(200).json(newUserData)

       } catch (err) {
         console.error(err)
         res.status(500).json(err)
       }
  };

  // Delete route 
  const deleteUser = async (req, res) => {
      try {
        const deleteUserData = await User.findOneAndRemove({ _id: req.params.userId })
  
        !deleteUserData
        ? res.status(400).json({ message: 'No such user exists'})
        : Thought.deleteMany(
          { _id: { $in: User.thoughts } }
        )
        res.status(200).json({ message: 'User succesfully deleted'})
  
         } catch (err) {
           console.error(err)
           res.status(500).json(err)
         }
    };

  // Put route 
  const updateUser = async (req, res) => {
      try {
        const updateUserData = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
          )
  
        !updateUserData
        ? res.status(400).json({ message: 'No such user exists'})
        : res.status(200).json(updateUserData)
  
         } catch (err) {
           console.error(err)
           res.status(500).json(err)
         }
    };
  
  // Post for adding a friend route
   const addFriend = async (req, res) => {
      try {
        const addFriendData = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        ).populate('friends')

        !addFriendData
        ? res.status(400).json({ message: 'No such user exists'})
        : res.status(200).json(addFriendData)

      } catch (err) {
           console.error(err)
           res.status(500).json(err)
         }
    };

  // Delete for deleting a friend route
   const deleteFriend = async (req, res) => {
      try {
        const deleteFriendData = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )

        !deleteFriendData
        ? res.status(400).json({ message: 'No such user exists'})
        : res.status(200).json(deleteFriendData)

      } catch (err) {
           console.error(err)
           res.status(500).json(err)
         }
    };

module.exports = { getUsers, getSingleUser, createUser, deleteUser, updateUser, addFriend, deleteFriend }