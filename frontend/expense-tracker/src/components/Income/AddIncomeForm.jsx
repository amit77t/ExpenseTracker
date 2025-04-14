import React, { useState } from 'react'
import Input from '../Inputs/Input';

import EmojiPickerPopup from '../EmojiPickerPopup';

function AddIncomeForm({ onAddIncome}) {
const [income, setIncome]=useState({
    source:"",
    amount:"",
    date:"",
    icon:"",
});

const handleChange =(key, value)=> setIncome({...income, [key]: value})

  return (
    <div>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}/>


        <Input
          value={income.source}
          onChange={({target}) => handleChange('source', target.value)}
           label="Income Source"
           placeholder="Freelance, salary, etc"
           type="text"  

        />
        <Input
          value={income.amount}
          onChange={({target}) => handleChange('amount', target.value)}
           label="Income Amount"
           placeholder="Enter amount"
           type="number"  
        />
        <Input
          value={income.date}
          onChange={({target}) => handleChange('date', target.value)}
           label="Income Date"
           placeholder=""
           type="date"  
        />
       
         
         <div className='flex justify-end mt-6'>

            <button type="button" className='add-btn add-btn-fill' onClick={() =>  onAddIncome(income)}>Add Income</button>
         </div>
   

    </div>
        
  )
}

export default AddIncomeForm;