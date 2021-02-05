const express = require('express');

const AuthController = require('../controllers/AuthController');
const GroupController = require('../controllers/GroupController');
const GroupEventController = require('../controllers/GroupEventController');
const GroupInviteUserController = require('../controllers/GroupInviteUserController');
const GroupInviteAdminController = require('../controllers/GroupInviteAdminController');

const router = express.Router();

router.post('/sign/up', (req, res) => AuthController.signUp(req, res));
router.post('/sign/in', (req, res) => AuthController.signIn(req, res));
router.post('/sign/out', (req, res) => AuthController.logout(req, res));

router.get('/group/', (req, res) => GroupController.index(req, res));
router.get('/group/:id', (req, res) => GroupController.detail(req, res));
router.post('/group/create', (req, res) => GroupController.create(req, res));
router.put('/group/update', (req, res) => GroupController.update(req, res));
router.delete('/group/:id/remove/', (req, res) => GroupController.remove(req, res));

router.get('/group/event', (req, res) => GroupEventController.index(req, res));
router.get('/group/:id/event', (req, res) => GroupEventController.detail(req, res));
router.post('/group/event/create', (req, res) => GroupEventController.create(req, res));
router.put('/group/event/update', (req, res) => GroupEventController.update(req, res));
router.delete('/group/event/:id//remove', (req, res) => GroupEventController.remove(req, res));

router.get('/group/user/invite', (req, res) => GroupInviteUserController.index(req, res));
router.get('/group/user/:id/invite', (req, res) => GroupInviteUserController.detail(req, res));
router.post('/group/user/invite/push', (req, res) => GroupInviteUserController.push(req, res));

router.get('/group/admin.invites', (req, res) => GroupInviteAdminController.index(req, res));
router.put('/group/admin/invite/:id/approve', (req, res) => GroupInviteAdminController.approve(req, res));
router.put('/group/admin/invite/:id/reject', (req, res) => GroupInviteAdminController.reject(req, res));

module.exports = router;
