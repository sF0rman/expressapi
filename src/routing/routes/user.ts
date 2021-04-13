import express from 'express';
const router = express.Router();

import { protect } from '../../utils/permissions';
import { getUserById, getSelf } from '../../controller/user';

router.get('/me', protect, getSelf);
router.get('/:id', protect, getUserById);

module.exports = router;