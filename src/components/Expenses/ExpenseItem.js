


import React from 'react';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = ( { expense, onDelete } ) => {
 
  if(!(expense.date instanceof Date)){
     
       expense.date = new Date(expense.date);
  }
  
  const handleDelete = ()=>{
    onDelete(expense.id)
  }

  const priceClass = expense.price.toString().length > 3 ? 'expense-item__price small' : 'expense-item__price';

  return (
    <li>
      <Card className='expense-item'>


        <div className='row align-items-center'>

          <div className='col-4 col-sm-4'>
            <ExpenseDate date={new Date(expense.date)} />
          </div>
          
          <div className='col-4 col-sm-4'>
               <div className='expense-item__description'><h2>{expense.item_name}</h2></div>
          </div>
          <div className='col-2 col-sm-2 text-center'>
             <div className={priceClass}>${expense.price}</div>
          </div>

          <div className='col-2 col-sm-2'>
            <button onClick={handleDelete} className='delete-button'>Delete</button>
            </div>

            
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
