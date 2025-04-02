import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io";
import { addThousandSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview ';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';

const Home = () => {
useUserAuth();

const navigate = useNavigate();  
const [dashboardData, setDashboardData]=useState(null);

const [loading, setLoading]= useState(false);

const fetchDashboardData= async()=>{
  if(loading){
    
    return;
  }

  setLoading(true);

  try{
    const response=await axiosInstance.get(
      `${API_PATHS.DASHBOARD.GET_DATA}`
    );
    if(response.data) {
      setDashboardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
  finally {
    setLoading(false);
  }
};

useEffect(() => {
 
  fetchDashboardData();
 
  return () => {
    
  }
}, []);




return (

    <DashboardLayout activeMenu="Dashboard">
          <div className='my-5 mx-auto'>

            {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <InfoCard
                icon ={<IoMdCard />}
                label="Total Balance"
                value={addThousandSeparator(dashboardData?.totalBalance || 0)}
                color="bg-primary"
              />
              <InfoCard
                icon ={<LuWalletMinimal />}
                label="Total income"
                value={addThousandSeparator(dashboardData?.totalIncome || 0)}
                color="bg-orange-500"
              />

              <InfoCard
                icon ={<LuHandCoins />}
                label="Total Expense"
                value={addThousandSeparator(dashboardData?.totalExpense || 0)}
                color="bg-red-400"
              />


            </div> */}
           
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={()=> navigate("/expense")}
              />

              {/* <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
              /> */}

              <ExpenseTransactions
                transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                onSeeMore={() => navigate("/expense")}
                />

          </div>


          </div>
    </DashboardLayout>
    
  );
};

export default Home;