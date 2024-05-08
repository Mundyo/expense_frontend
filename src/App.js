
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NewExpense from './components/NewExpense/NewExpense';
import 'bootstrap/dist/css/bootstrap.min.css';
import Expenses from './components/Expenses/Expenses';
import Signup from './components/login/signup.jsx';
import LoginForm from './components/login/loginform.jsx';
import React, { useState, useEffect } from 'react';


const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2022, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2023, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2023, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2023, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

    const saveExpenseDataHandler =(expense) => {
      setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  const handleLogin = (userId) => {
    console.log('User logged in with ID:', userId);
  
  }

  

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Navigate to='/login'/>} />
      <Route path='/login' element={<LoginForm onLogin={handleLogin}/>}/>
      <Route path='/login' element={<Signup/>}/>
      <Route
        path='/account'
        element={
          <>
        
            <NewExpense onSaveExpenseData={saveExpenseDataHandler}/>
            <Expenses items={expenses} />
          </>
        }
        children={(props)=>{
          const userId = new URLSearchParams(props.location.search).get('user_id');
          return userId ? (
          <>
         
            <NewExpense onSaveExpenseData={saveExpenseDataHandler}/>
            <Expenses items={expenses} /> 
          </>
          ) : null;
        }}
      
      />
      </Routes>
    </Router>
  );
};

export default App;