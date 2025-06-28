const { getDB } = require("../../config/db");

const GenerateSlip = async (req, res) => {
  const db = getDB();
  const { user_id, month } = req.body;
  console.log("data recieved is",req.body)

  const user = await db.collection('users').findOne({ user_id });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const attendance = await db.collection('Attendance').find({
    user_id,
    date: { $regex: `^${month}` }
  }).toArray();
  console.log("attendance is",attendance)

  const PresentDays = attendance.filter(a => a.status === 'Present').length;
  console.log('Present day is',PresentDays)

  const basicsalary = 45000;
  const workingDays = 26;
  const absentdays = workingDays - PresentDays;
  console.log("absent days is",absentdays)
  const paidleaves = 2;

  const tax = basicsalary * 0.1;
  const pf = basicsalary * 0.05;
  let givensalary, totaldeduction, leavededuction;

  if (absentdays > paidleaves) {
    leavededuction = (absentdays - paidleaves) * (basicsalary / workingDays);
    totaldeduction = tax + pf + leavededuction;
  } else {
    leavededuction = 0;
    totaldeduction = tax + pf;
  }

  givensalary = basicsalary - totaldeduction;


    const Payrolldoc= {
    employee_id:user_id,
    employee_name:user.username,
    month:month,

    basic_salary:basicsalary,

    attendance_summary:{
      total_working_days:workingDays,
      present_days:PresentDays,
      absent_days: absentdays,
      paid_leave_allowance: paidleaves,
      unpaid_leave_days: Math.max(0, absentdays - paidleaves)
    },

    deductions: {
    tax_amount: tax,
    pf_amount: pf,
    leave_deduction: leavededuction.toFixed(2) || 0,
    total_deduction: totaldeduction.toFixed(2)
  },

    salary_breakdown: {
    gross_salary: basicsalary,
    net_salary: givensalary.toFixed(2)
  },

  status: "Processed",                  // "Draft", "Processed", "Paid"
  generated_on: new Date().toISOString().slice(0, 10) // e.g. "2025-06-26"
  }
  console.log('Payroll is',Payrolldoc)

 await db.collection('Payrolls').insertOne(Payrolldoc)

  return res.json({
    message: "Slip generated sucessfully and added into the DB",
    Payrolldoc
  });


};


module.exports= {GenerateSlip};