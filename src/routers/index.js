const express = require('express');

const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/sign/up', (req, res) => AuthController.signUp(req, res));
router.post('/sign/in', (req, res) => AuthController.signIn(req, res));
router.post('/sign/out', (req, res) => AuthController.logout(req, res));

module.exports = router;
