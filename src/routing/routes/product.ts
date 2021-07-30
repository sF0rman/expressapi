import express from 'express';
const router = express.Router();

import {getAllProducts, getProductById} from '../../controller/product';

router.get('', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;