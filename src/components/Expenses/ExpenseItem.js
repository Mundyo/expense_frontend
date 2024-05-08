


import React from 'react';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = ( { expense } ) => {
 
  if(!(expense.date instanceof Date)){
     
       expense.date = new Date(expense.date);
  }


  return (
    <li>
      <Card className='expense-item'>
        <div className='row align-items-center'>
          <div className='col-5 col-sm-4'>
            <ExpenseDate date={expense.date} />
          </div>
          <div className='col-7 col-sm-8'>
            <div className='expense-item__description'>
              <h2>{expense.item_name}</h2>
              <div className='expense-item__price'>${expense.price}</div>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
