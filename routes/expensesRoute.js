import express from 'express';
import { addExpense, updateExpense, deleteExpense } from '../controllers/expensesController.js';
const router = express.Router();

router.post('/add', addExpense)
router.put('/update/:id', updateExpense)
router.delete('/delete/:id', deleteExpense)

export default router;