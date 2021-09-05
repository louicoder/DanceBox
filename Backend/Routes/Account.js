const router = require('express').Router();
const { AccountController: AC } = require('../Controllers');

router.post('/create', AC.register);
router.post('/login', AC.login);
router.post('/update/:uid', AC.updateAccount);
router.get('/organisers', AC.getOrganisers);
router.get('/organisers/all', AC.getAllOrganisers);
router.get('/account/:uid', AC.getUser);
router.post('/follow/:following', AC.followAccount);
router.post('/unfollow/:follower', AC.unfollowAccount);
router.get('/:uid', AC.getAccount);

module.exports = router;
