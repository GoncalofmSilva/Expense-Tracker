import express from 'express';
import { addExpense, updateExpense, deleteExpense, viewAllExpenses, summaryOfExpenses, summaryOfExpensesForMonth } from '../controllers/expensesController.js';
const router = express.Router();

router.post('/add', addExpense)
router.put('/update/:id', updateExpense)
router.delete('/delete/:id', deleteExpense)
router.get('/list', viewAllExpenses)
router.get('/summary', summaryOfExpenses)
router.get('/summary/month', summaryOfExpensesForMonth)

export default router;