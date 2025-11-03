import {createExpense} from '../models/expensesModel.js';

export const addExpense = async (req, res) => {
    try {
        const {description, amount} = req.body

        if (!description || !amount){
            return res.status(400).json({message : 'Description and amount are required.'});
        }
        const newExpense = await createExpense({description, amount})
        res.status(201).json(newExpense);

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error' });
    }
}