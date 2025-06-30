const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController=require('../controllers/notificationController')

// Public routes
router.get('/notification',auth,notificationController.getNotification)
router.post('/notification',auth,notificationController.sendNotification)
router.delete('/all',auth,notificationController.deleteAllNotification)
module.exports = router; 