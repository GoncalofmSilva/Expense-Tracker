import express from 'express';
import { addExpense, updateExpense } from '../controllers/expensesController.js';
const router = express.Router();

router.post('/add', addExpense)
router.put('/update/:id', updateExpense)

export default router;