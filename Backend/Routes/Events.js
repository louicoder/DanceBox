const router = require('express').Router();
const { EventsController: EC } = require('../Controllers');

router.post('/create', EC.createEvent);
router.get('/single/:eventId', EC.getEvent);
router.get('/random', EC.getRandomEvents);
router.get('/all', EC.allEvents);
router.get('/search?', EC.searchEvent);
router.get('/user/:ownerUid', EC.getEventsForSingleUser);
router.patch('/update/:eventId', EC.updateEvent);
router.patch('/like/:eventId/:uid', EC.likeEvent);
router.patch('/comments/create/:eventId', EC.createEventComment);
router.patch('/attend/:eventId/:uid', EC.attendEvent);
router.patch('/unattend/:eventId/:uid', EC.unattendEvent);
router.patch('/participate/:eventId/:uid', EC.participateInEvent);
router.patch('/unparticipate/:eventId/:uid', EC.unparticipateInEvent);
router.delete('/delete/:eventId', EC.deleteEvent);

module.exports = router;
