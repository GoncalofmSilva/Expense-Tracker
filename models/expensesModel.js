import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'expenses.json');

async function readExpenses() {
  const data = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function writeExpenses(expenses) {
  await fs.promises.writeFile(filePath, JSON.stringify(expenses, null, 2));
}

let expenses = await readExpenses();
let expenseId = expenses.length > 0 ? Math.max(...expenses.map(t => t.id)) + 1 : 1;

export async function createExpense({description, amount}) {
    expenses
    const newExpense = {id: expenseId++, description, amount, date: new Date().toISOString()};
    expenses.push(newExpense)
    await writeExpenses(expenses);
    return newExpense
}