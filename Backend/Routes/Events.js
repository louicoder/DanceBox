const router = require('express').Router();
const { EventsController: EC } = require('../Controllers');

router.post('/create', EC.createEvent);
router.get('/single/:eventId', EC.getEvent);
router.get('/random', EC.getRandomEvents);
router.get('/all', EC.allEvents);
router.get('/user/:ownerUid', EC.getEventsForSingleUser);
router.patch('/update/:eventId', EC.updateEvent);
router.patch('/like/:eventId', EC.likeEvent);
router.patch('/comments/create/:eventId', EC.createEventComment);
router.patch('/attend/:eventId', EC.attendEvent);
router.patch('/participate/:eventId', EC.participateInEvent);
router.delete('/delete/:eventId', EC.deleteEvent);

module.exports = router;
