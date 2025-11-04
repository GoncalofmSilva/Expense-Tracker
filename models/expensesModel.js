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
  if (index !== -1) {
    expenses[index] = { ...expenses[index], description, amount, date: expenses[index].date };
    await writeExpenses(expenses);
    return expenses[index];
  }
  return null;
}

export async function deletedExpense(id) {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => expense.id === id)
  if(index !== -1){
    const deleted = expenses.splice(index, 1)[0]
    await writeExpenses(expenses)
    return deleted
  }
  return null;
}

export async function getAllExpenses() {
  const expenses = await readExpenses();
  return expenses;
}

export async function summOfExpenses() {
  const expenses = await readExpenses()
  let total = 0
  for(let expense of expenses){
    expense.amount = parseFloat(expense.amount.split("€")[0])
    total += expense.amount // adding up all amounts and assigning to total
  }

  return { total: `Total expenses ${total}€` };
}

export async function summOfExpensesMonth(month) {
  const expenses = await readExpenses()
  const year = new Date().getFullYear() // get current year
  const monthNumber = new Date(`${month} 1, ${year}`).getMonth()+1; // add 1 because getMonth is zero-based and add the year to avoid NaN
  let total = 0
  for (let expense of expenses){
    if(parseInt(expense.date.split("-")[1]) === monthNumber){
      expense.amount = parseFloat(expense.amount.split("€")[0])
      total += expense.amount // adding up all amounts and assigning to total
    }
  }

  return { total: `Total expenses for current ${total}€` };
}