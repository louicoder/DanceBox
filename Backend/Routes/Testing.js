const router = require('express').Router();
const { TestingController: TC } = require('../Controllers');

router.post('/update', TC.update);
router.post('/delete', TC.deleti);

module.exports = router;
