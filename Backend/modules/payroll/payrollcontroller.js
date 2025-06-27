const { getDB } = require("../../config/db");

const GenerateSlip = async (req, res) =>{

      const db = getDB();
      console.log(db)
      const { user_id, month } = req.body;
      const user = await db.collection('users').findOne({ user_id });
      if (!user) return res.status(404).json({ message: 'User not found' });

    const attendance = await db.collection('Attendance').find({
    user_id,
    date: { $regex: `^${month}` }
    }).toArray();

    const PresentDays=attendance.filter((a)=>(a.
     status==='Present')).length
   
  console.log('Presnt day',PresentDays)
    const basicsalary=45000;
    const workingDays=26;
    const absentdays=workingDays-PresentDays
    console.log('Absent day is',absentdays)
    const paidleaves=2;
    const tax=basicsalary*0.1
    const pf=basicsalary*0.05
    let givensalary;
    let totaldeduction;
    let leavededuction;
    if(absentdays>paidleaves){
    leavededuction=(absentdays-paidleaves)*(basicsalary/workingDays);  
    totaldeduction=tax+pf+leavededuction
    console.log('Leavededuction is',leavededuction)
    givensalary=basicsalary-totaldeduction;
    }else if(absentdays<paidleaves){
    givensalary=basicsalary-totaldeduction;
    }
    res.json({message:"Generated slip is",
      "Total working days":workingDays,
    "Total your work day is":workingDays-absentdays,
  "tax is":tax,
"pf is":pf,
"leave deduction is":leavededuction,
'total deduction is':totaldeduction,
'given salary is':givensalary}) 
}

module.exports= {GenerateSlip};