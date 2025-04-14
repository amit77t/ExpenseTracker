import React, { useEffect, useState } from 'react'
import {useUserAuth} from "../../hooks/useUserAuth";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';


function Expense() {

  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

/* Get All Expense Details */
const fetchExpenseDetails=async()=>{

  if(loading) return;
   setLoading(true);
  try {
    const response=await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
    
    if(response.data)
    {
      setExpenseData(response.data);
    }

  } catch (error) {
    console.error('Error fetching expense details:', error);
  } finally {
    setLoading(false);
  }
  
};

//handle Add Expense

const handleAddExpense= async (expense)=>{
  const { category, amount, date, icon} = expense;

  // validation check

  if(!category.trim()){
    toast.error("Expense category is required.");
    return;
  }
  if(!amount || isNaN(amount)|| Number(amount)<=0)
  {
    toast.error("Income amount must be a positive number.");
    return;
  }

  if(!date)
  {
    toast.error("Income date is required.");
    return;
  }
  try{
    await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
      category,
      amount,
      date,
      icon,

    });
    

    setOpenAddExpenseModel(false);
    toast.success("Expense added successfully!");
    fetchExpenseDetails();
  }catch(error)
  {
   console.error("Error adding expense:", error.response?.data?.message || error.message);
   toast.error("Failed to add expense. Please try again.");
  }

  
 };

 //Delete Expense

 const deleteExpense = async (id) =>{

  try{

    await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
    setOpenDeleteAlert({show: false, data: null});
    toast.success("Expense deleted successfully!");
    fetchExpenseDetails();
  }catch(error)
  {
    
    console.error("Error deleting expense:", error.response?.data?.message || error.message);
  }




};

// handle download expense details


const handleDownloadExpenseDetails = async () => {

};



 useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
              
    <div className='my-5 mx-auto '>
       <div className="grid grid-cols-1 gap-6">
        <div className=''>
          <ExpenseOverview
            trasactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />
        </div>

        <ExpenseList
          trasactions={expenseData}
          onDelete={(id)=>{
            setOpenDeleteAlert({ show: true, data: id });
          }}
          onDownload={handleDownloadExpenseDetails}
          />

       </div>
     
     <Modal
     isOpen={openAddExpenseModel}
     onClose={() => setOpenAddExpenseModel(false)}
     title="Add Expense"
     >
      <AddExpenseForm onAddExpense={handleAddExpense} />  
    </Modal>

    </div>
    </DashboardLayout>
    
  )
}

export default Expense;