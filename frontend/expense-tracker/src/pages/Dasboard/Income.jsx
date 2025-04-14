import React from 'react'

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

const handleAddIncome= async (income)={};



const deleteIncome= async (id) => {

  try {
    const response = await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, income);
    setIncomeData([...incomeData, response.data]);
  } catch (error) {
    console.error('Error deleting income:', error);
  }
};

// Handle download income details
const handleDownloadIncomeDetails= async() =>{};

useEffect(() => {
  fetchIncomeDetails();
  return ()=> {};
}, []);


  return (
    <div>Income</div>
  )
}

export default Income