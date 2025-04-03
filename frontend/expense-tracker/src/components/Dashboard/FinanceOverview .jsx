import React from 'react';
import CustomerPieChart from '../Charts/CustomerPieChart';

const COLORS=["#875CF5","#FA2C37","#FF6900"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpenses})=>{
 
  const balanceData=[
    {name:"Total Balance", amount: totalBalance},
    {name:"Total Expense", amount: totalExpenses},
    {name:"Total Income", amount: totalIncome}];
 
 
    return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h1 className='text-lg'>Financial Overview</h1>
        </div>
        <CustomerPieChart
        data={balanceData}
        label="Total Amount"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        />

    </div>
  ); 
}

export default FinanceOverview;