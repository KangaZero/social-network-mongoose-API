const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/courseController.js');

// /api/courses
router.route('/').get(getUsers).post(createUser);

// /api/courses/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  // TODO complete this
router.route('/:userID/friends/:friendId')
    .get()

module.exports = router;
