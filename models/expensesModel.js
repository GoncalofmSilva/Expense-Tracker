import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "expenses.json");

async function readExpenses() {
  const data = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(data);
}

async function writeExpenses(expenses) {
  await fs.promises.writeFile(filePath, JSON.stringify(expenses, null, 2));
}

let expenses = await readExpenses();
let expenseId =
  expenses.length > 0 ? Math.max(...expenses.map((t) => t.id)) + 1 : 1;

export async function createExpense({ description, amount }) {
  const expenses = await readExpenses();
  const newExpense = {
    id: expenseId++,
    description,
    amount,
    date: new Date().toISOString().split("T")[0],
  };
  expenses.push(newExpense);
  await writeExpenses(expenses);
  return newExpense;
}

export async function updatedExpense({ id, description, amount }) {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => expense.id === id);
  console.log(index);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], description, amount, date: expenses[index].date };
    await writeExpenses(expenses);
    return expenses[index];
  }
  return null;
}