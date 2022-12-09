const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// // Aggregate function to get the number of students overall
// const headCount = async () =>
//   Student.aggregate()
//     .count('studentCount')
//     .then((numberOfStudents) => numberOfStudents);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: ObjectId(studentId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: ObjectId(studentId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

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
  
//     /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list


  // Add an assignment to a student
  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeAssignment(req, res) {
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },

module.exports = { getUsers, getSingleUser, createUser, deleteUser, updateUser }