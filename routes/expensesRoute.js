import express from 'express';
import { addExpense } from '../controllers/expensesController.js';
const router = express.Router();

router.post('/add', addExpense)

export default router;