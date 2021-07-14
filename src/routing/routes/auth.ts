import express from 'express';
import { login, logout, register, reset, resetPassword } from '../../controller/auth';
import { protect } from '../../utils/permissions';
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/reset', reset);
router.post('/resetPassword', resetPassword);

module.exports = router;