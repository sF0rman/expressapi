import express from 'express';
const router = express.Router();

import { protect, authorize } from '../../utils/permissions';
import { getUserById, getSelf, getAllUsers } from '../../controller/user';

router.get('', protect, getAllUsers);
router.get('/me', protect, getSelf);
router.get('/:id', protect, getUserById);

module.exports = router;