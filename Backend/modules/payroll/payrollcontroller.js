const { getDB } = require("../../config/db");

const usersalarybyitsid = async(req,res) =>{
  const db=getDB();

  const {id}=req.params;
  console.log("id recieved is",id);
  try{
    const user=await db.collection('SalaryInfo').findOne(
      {employee_id:id}
    )
    if(!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  }
  catch(error){
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
const GenerateSlip = async (req, res) => {
  const db = getDB();
  const { user_id, month } = req.body;

  const user = await db.collection('SalaryInfo').findOne({ 
   employee_id :user_id });

try {
  if (!user || !user.employee_name) {
    return res.status(400).json({ error: "Invalid user data" });
  }

  const salaryslip = await db.collection('Payrolls').findOne({
    employee_id: user_id,
    month
  });

  if (salaryslip) {
    console.log('Saved salary slip fetched:', salaryslip);
    return res.json(salaryslip);
  }

  const attendance = await db.collection('Attendance').find({
    user_id,
    date: { $regex: `^${month}` }
  }).toArray();

  const presentDays = attendance.filter(a => a.status === 'Present').length;
  const basicSalary = user.base_salary;
  const workingDays = 26;
  const paidLeaves = user.paid_leaves_allowed;
  const absentDays = workingDays - presentDays;

  const tax = basicSalary * (user.tax_percent/100);
  const pf = basicSalary * (user.pf_percent/100);
  const unpaidLeaves = Math.max(0, absentDays - paidLeaves);
  const leaveDeduction = unpaidLeaves * (basicSalary / workingDays);
  const totalDeduction = tax + pf + leaveDeduction;
  const netSalary = basicSalary - totalDeduction;

  const payrollDoc = {
    employee_id: user_id,
    employee_name: user.employee_name,
    month,
    basic_salary: basicSalary,

    attendance_summary: {
      total_working_days: workingDays,
      present_days: presentDays,
      absent_days: absentDays,
      paid_leave_allowance: paidLeaves,
      unpaid_leave_days: unpaidLeaves
    },

    deductions: {
      tax_amount: tax,
      pf_amount: pf,
      leave_deduction: leaveDeduction,
      total_deduction: totalDeduction
    },

    salary_breakdown: {
      gross_salary: basicSalary,
      net_salary: netSalary
    },

    status: "Processed",
    generated_on: new Date().toISOString().slice(0, 10)
  };

  await db.collection('Payrolls').insertOne(payrollDoc);
  console.log('New salary slip generated:', payrollDoc);
  return res.json(payrollDoc);

} catch (error) {
  console.error("Salary generation error:", error);
  return res.status(500).json({ error: error.message });
}

};

const Addsalaryinfo= async (req,res) =>{
    const db = getDB();
  const {employee_id,employee_name,base_salary,hra,bonus,tax_percent,pf_percent,joining_date,updated_by}=req.body;
  const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  const today = nowIST.toISOString().split("T")[0];

  const result=await db.collection('SalaryInfo').insertOne({
     employee_id,
     employee_name,
     base_salary,
     hra,
     bonus,
     tax_percent,
     pf_percent,
     joining_date,
     last_update:nowIST,
     updated_by
  })
  return res.json({message:"Data inserted sucessfully",result})
}

const Updatesalaryinfo= async (req,res) =>{
    const db = getDB();
  const {employee_id,employee_name,base_salary,hra,bonus,tax_percent,pf_percent,joining_date,updated_by}=req.body;
  const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  const today = nowIST.toISOString().split("T")[0];

  const result=await db.collection('SalaryInfo').updateOne({employee_id},{$set:{
     employee_id,
     employee_name,
     base_salary,
     hra,
     bonus,
     tax_percent,
     pf_percent,
     joining_date,
     last_update:nowIST,
     updated_by
  }})
  return res.json({message:"Data updated sucessfully",result})
}


module.exports= {GenerateSlip,Addsalaryinfo,Updatesalaryinfo,usersalarybyitsid};