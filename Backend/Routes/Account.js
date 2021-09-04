const router = require('express').Router();
const { AccountController } = require('../Controllers');

router.post('/create', AccountController.register);
router.post('/login', AccountController.login);
router.post('/update/:uid', AccountController.updateAccount);
router.get('/organisers', AccountController.getOrganisers);
router.get('/organisers/all', AccountController.getAllOrganisers);
router.get('/account/:uid', AccountController.getUser);
router.get('/:uid', AccountController.getAccount);

module.exports = router;
