import React, { useState, useEffect } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState();
  const [enteredAmount, setEnteredAmount] = useState('');
  const [amountIsValid, setAmountIsValid] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=> {
    setFormIsValid(
      enteredTitle.trim().length > 0 && enteredAmount > 0
    );
  }, [enteredTitle, enteredAmount]);
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: '',
  // });

  const titleChangeHandler = (event) => {
    
    if(event.target.value.trim().length > 0) {
      setTitleIsValid(true);
    }
    setEnteredTitle(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const validateTitleHandler = () => {
    setTitleIsValid(enteredTitle.trim().length > 0);
  };

  const validateAmountHandler = () => {
    setAmountIsValid(enteredAmount > 0);
  }

  const amountChangeHandler = (event) => {
    if(event.target.value > 0) {
      setAmountIsValid(true);
    }
    setEnteredAmount(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className={`new-expense__control ${!titleIsValid ? 'invalid' : ''}`}>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={validateTitleHandler}
          />
        </div>
        <div className={`new-expense__control ${!amountIsValid ? 'invalid' : ''}`}>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
            onBlur={validateAmountHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit' disabled={!formIsValid}>Add Expense</button>
        
      </div>
    </form>
  );
};

export default ExpenseForm;