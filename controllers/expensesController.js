import { createExpense, updatedExpense, deletedExpense } from "../models/expensesModel.js";

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
    res
      .status(200)
      .json({
        message: `Expense ID ${expenseId} deleted successfully`,
        deleted,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting expense", details: error.message });
  }
};

// TODO: Implement View all Expenses / Summary of Expenses / Summary of Expenses for specific month (current year)