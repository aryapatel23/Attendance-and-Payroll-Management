const { getDB } = require("../../config/db");

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


module.exports= {GenerateSlip};