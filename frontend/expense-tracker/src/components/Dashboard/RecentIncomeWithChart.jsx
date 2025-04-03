import React, { useEffect, useState } from 'react'
import CustomerPieChart from '../Charts/CustomerPieChart';


const COLORS=["#875CF5", "#FA2C37", "FF6900","#4f39f6"];
function RecentIncomeWithChart({ data, totalIncome }) {

  const [charData, setCharData]=useState([]);
  const prepareChartData = () => {
   const dataArr= data?.map((item)=>({
    name:item?. source,
    amount: item?.amount,
   }));
    setCharData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 60 days Income</h5>

        </div>
        <CustomerPieChart
        data={charData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS} 
        /> 
    </div>
  )
}

export default RecentIncomeWithChart;