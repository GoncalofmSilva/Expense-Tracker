import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'tasks.json');

async function readExpenses() {
  const data = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function writeExpenses(tasks) {
  await fs.promises.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

let expenses = await readTasks();
let expenseId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

export async function addExpense({description, amount}) {
    expenses
    const newExpense = {id: expenseId++, description, amount, date: new Date().toISOString()};
    expenses.push(newExpense)
    await writeExpenses(expenses);
    return newExpense
}