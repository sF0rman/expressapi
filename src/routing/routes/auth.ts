import express from 'express';
const router = express.Router();

import { register, login, logout, reset } from '../../controller/auth';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset', reset);

module.exports = router;