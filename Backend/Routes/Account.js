const router = require('express').Router();
const { AccountController } = require('../Controllers');

router.post('/create', AccountController.createAccounts);
router.post('/update/:uid', AccountController.updateAccount);
router.get('/organisers', AccountController.getOrganisers);
router.get('/organisers/all', AccountController.getAllOrganisers);
router.get('/:uid', AccountController.getAccount);

module.exports = router;
