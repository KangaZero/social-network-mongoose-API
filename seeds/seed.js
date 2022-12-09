const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersArray }= require('./userSeed');
const { thoughtArray }= require('./thoughtSeed');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop model data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Add model data to collection
  const userSeededData = await User.collection.insertMany(usersArray);
  const thoughtSeededData = await Thought.collection.insertMany(thoughtArray);

  // Log out the seed data to indicate what should appear in the database
  console.log(userSeededData, thoughtSeededData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
