


import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import './ExpensesList.css';

const ExpensesList = ({ userId, filteredYear, onDeleteExpense }) => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        
        const response = await fetch(`https://expense-backend-f7e811c7173d.herokuapp.com/account?user_id=${userId}`);
       
        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }
        const data = await response.json();
        console.log('Data', data);
        setExpenses(data.expenses.rows);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };
   
    
      fetchExpenses();
      const intervalId= setInterval(fetchExpenses, 1000);
      return () => clearInterval(intervalId);
    }, [userId]);


    const handleDeleteExpense = async (expenseId) => {
      try {
        const response = await fetch(`https://expense-backend-f7e811c7173d.herokuapp.com/account/${expenseId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete expense.');
        }
  
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== expenseId));
      } catch (error) {
        console.error(error.message);
      }
    };


  if (error) {
    return <h2 className="expenses-list__fallback">Error: {error}</h2>;
  }

  if (expenses.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }


  const filteredExpenses = expenses.filter(expense => {
    const expenseYear = new Date(expense.date).getFullYear();
    return expenseYear.toString() === filteredYear;
  })

    return (
    <ul className="expenses-list">
      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={handleDeleteExpense}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
