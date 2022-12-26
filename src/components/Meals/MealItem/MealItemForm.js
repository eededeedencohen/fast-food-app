import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] =  useState(true)
  const amountInputRef = useRef();

  const submitHandler = (event)=>{
    event.preventDefault();

    // value is the value of the input (type:number in my case)
    const enteredAmount = amountInputRef.current.value;

    // value is always a string.  +enteredAmount is convert it to type number
    const enteredAmounTypeNumber = +enteredAmount

    if(enteredAmount.trim().length === 0 || enteredAmounTypeNumber < 1 || enteredAmounTypeNumber>5){
      setAmountIsValid(false);
      return; // return an not continue
    }
    props.onAddToCart(enteredAmounTypeNumber);

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please set a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;