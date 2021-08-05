import express from 'express';
import { getAllProducts, getProductById } from '../../controller/product';
const router = express.Router();


router.get('', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;