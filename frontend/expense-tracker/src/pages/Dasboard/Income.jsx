import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';

function Income() {

 
const [incomeData, setIncomeData] = useState([]);
const [loading, setLoading] = useState(false);
const [openDeleteAlert, setOpenDeleteAlert] = useState({
  show:false,
  data:null,
});
const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

/* Get All Income Details */
const fetchIncomeDetails=async()=>{

  if(loading) return;
   setLoading(true);
  try {
    const response=await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
    
    if(response.data)
    {
      setIncomeData(response.data);
    }

  } catch (error) {
    console.error('Error fetching income details:', error);
  } finally {
    setLoading(false);
  }
  
};

//handle Add income

const handleAddIncome= async (income)=>{
  const { source, amount, date, icon} = income;

  // validation check

  if(!source.trim()){
    toast.error("Income source is required.");
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
    await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
      source,
      amount,
      date,
      icon,

    });
    

    setOpenAddIncomeModel(false);
    toast.success("Income added successfully!");
    fetchIncomeDetails();
  }catch(error)
  {
   console.error("Error adding income:", error.response?.data?.message || error.message);
  }

  
 };


 //Delete Income

 const deleteIncome = async (id) =>{

    try{

      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully!");
      fetchIncomeDetails();
    }catch(error)
    {
      
      console.error("Error deleting income:", error.response?.data?.message || error.message);
    }

  


 };
 
 // handle download income details


 const handleDownloadIncomeDetails = async () => {

 };

 useEffect(() => {
   fetchIncomeDetails();
 }, []);




return ( <DashboardLayout activeMenu="Income">
          <div className='my-5 mx-auto '>
            <div className='grid grid-cols-1 gap-6'>
              <div className=''>
                <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => setOpenAddIncomeModel(true)}
                 
                 
                />
              </div>
              <IncomeList
                transactions={incomeData} 
                onDelete={(id)=>{
                  setOpenDeleteAlert({show: true, data: id});

                }}
                onDownload={handleDownloadIncomeDetails}
                />
                


            </div>
            
            <Modal
            isOpen={openAddIncomeModel}
            onClose={() => setOpenAddIncomeModel(false)}
            title="Add Income" 
            >
            <AddIncomeForm onAddIncome={handleAddIncome} />
             
            </Modal>
            <Modal
             isOpen={openDeleteAlert.show}
             onClose={()=> setOpenDeleteAlert ({show: false, data: null})}
               title="Delete Income"
               >
                <DeleteAlert
                content="Are are you want to delete this income detail?"
                  onDelete={() => {
                     deleteIncome(openDeleteAlert.data)
                  }}     
                  />
               </Modal>
          </div>
          
          </DashboardLayout>
    
  );
};

export default Income