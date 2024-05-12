import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2024');
  const userId = parseInt(localStorage.getItem('user_id'), 10) || null;
  const [expenses, setExpenses] = useState([]);

 

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpenses}  />
        <ExpensesList 
        items={filteredExpenses} 
        userId={userId}
         expenses={expenses} 
         setExpenses={setExpenses} 
         filteredYear={filteredYear}
         />
      </Card>
    </div>
  );
};

export default Expenses;