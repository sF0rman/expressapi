import express from 'express';
const router = express.Router();

import { getAllNews, getNewsById } from '../../controller/news';

router.get('', getAllNews);
router.get('/:id', getNewsById);

module.exports = router;