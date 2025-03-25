
const xlsx=require("xlsx");
const Income= require('../models/Income');












//Add icome Source


exports.addIncome= async (req, res) => {

const userId= req.user.id;
try{
      
    const { icon, source, amount, date } = req.body;

    // validation check for missing fields
    if (!source || !amount || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const newIncome = new Income({ 
        userId, icon, source, amount, date: new Date(date) });

    await newIncome.save();
    res.status(200).json(newIncome);
}catch(error) {
    res.status(500).json({message: "Error adding income source"});
}
}

// // Get all Income Source

exports.getAllIncome = async (req, res) => {
   const userId= req.user.id;
   
    
   try {
       const income = await Income.find({ userId }).sort({date:-1});
       res.json(income);
   } catch (error) {
       res.status(500).json({ message: "Error retrieving income sources" });
   }
}

// // Delete Income Source

exports.deleteIncome = async (req, res) => {
   
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income source deleted successfully" });
    } catch(error) {
        res.status(500).json({ message: "Error deleting income source" });
    }
}

// // Download Excel

exports.downloadIncomeExcel = async (req, res) => {
    
  const userId= req.user.id;
  

  try {
      const incomeData = await Income.find({ userId }).sort({ date: -1 });
      const data = incomeData.map((item) => ({
          
          Source: item.source,
          Amount: item.amount,
          Date: item.date 
      }));

      const wb=xlsx.utils.book_new();
      const ws=xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, 'Income Data');
      
      xlsx.writeFile(wb,  'income_details.xlsx');
      res.download('income_details.xlsx');

      
  } catch (error) {
      res.status(500).json({ message: "Error generating Excel file" });
  }
  
}
