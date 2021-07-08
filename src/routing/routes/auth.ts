import express from 'express';
const router = express.Router();

import { register, login, logout, reset } from '../../controller/auth';
import { protect } from '../../utils/permissions';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/reset', reset);

module.exports = router;