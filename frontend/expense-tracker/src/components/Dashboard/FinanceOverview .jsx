import React from 'react';
import CustomerPieChart from '../Charts/CustomerPieChart';

const COLORS=["#875CF5","#FA2C37", " #FF6900"];

function FinanceOverview ({totalBalance, totalIncome, totalExpense}) {
 
  const balanceData=[
    {name:"Total Balance", amount: totalBalance},
    
    {name:"Total Income", amount: totalIncome},
    {name:"Total Expense", amount: totalExpense},
  ];
 
 
    return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h1 className='text-lg'>Finacial Overview</h1>
        </div>
        < CustomerPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        />

    </div>
  ); 
}

export default FinanceOverview;