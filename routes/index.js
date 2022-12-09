const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// For any routes not included
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
