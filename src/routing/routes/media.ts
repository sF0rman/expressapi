import express from 'express';
const router = express.Router();

import { getImage } from '../../controller/media';

router.get('/img/:id', getImage);

module.exports = router;