import express from 'express';
import routes from './routes/expensesRoute.js';
const app = express();
const port = 3000;

app.use(express.json());

app.use('/expenses', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})