import {
  createExpense,
  updatedExpense,
  deletedExpense,
  getAllExpenses,
  summOfExpenses,
  summOfExpensesMonth,
} from "../models/expensesModel.js";

export const addExpense = async (req, res) => {
  try {
    const { description, amount } = req.body;

    if (!description || !amount) {
      return res
        .status(400)
        .json({ message: "Description and amount are required." });
    }
    const newExpense = await createExpense({ description, amount });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { description, amount } = req.body;
    const expenseId = parseInt(req.params.id);

    if (!expenseId || !description || !amount) {
      return res.status(400).json({
        error: "Expense ID, description, and amount are required for update",
      });
    }

    const updated = await updatedExpense({
      id: expenseId,
      description,
      amount,
    });
    res.status(200).json({
      message: `Expense ID ${expenseId} updated successfully`,
      updated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating expense", details: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);
    if (!expenseId) {
      return res
        .status(400)
        .json({ message: "Expense ID is required for deletion" });
    }

    const deleted = await deletedExpense(expenseId);
    res.status(200).json({
      message: `Expense ID ${expenseId} deleted successfully`,
      deleted,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting expense", details: error.message });
  }
};

export const viewAllExpenses = async (req, res) => {
  try {
    const expenses = await getAllExpenses();
    res
      .status(200)
      .json({ message: "All expenses retrieved successfully", expenses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error listing expenses", details: error.message });
  }
};

export const summaryOfExpenses = async (req, res) => {
  try {
    const expenses = await summOfExpenses();
    res
      .status(200)
      .json({
        message: "Summary of expenses retrieved successfully",
        expenses,
      });
  } catch (error) {
    res.status(500).json({
      error: "Error getting summary of expenses",
      details: error.message,
    });
  }
};

export const summaryOfExpensesForMonth = async (req, res) => {
  try {
    const {month} = req.body;

    if (!month) {
      return res
        .status(400)
        .json({ message: "Month is required for deletion" });
    }

    const expenses = await summOfExpensesMonth(month);
    res
      .status(200)
      .json({
        message: "Summary of expenses for month retrieved successfully",
        expenses,
      });
  } catch (error) {
    res.status(500).json({
      error: "Error getting summary of expenses for month",
      details: error.message,
    });
  }
}

// TODO: Summary of Expenses for specific month (current year)
