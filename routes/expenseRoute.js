import express from 'express';
import { addExpense } from '../controllers/expenseController.js';
const router = express.Router();

router.get('/add', addExpense)

export default router;