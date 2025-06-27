const { getDB } = require("../../config/db");

const GenerateSlip = async (req, res) =>{

      const db = getDB();
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
    let givensalary;
    if(absentdays>paidleaves){
    const leavededuction=(absentdays-paidleaves)*(basicsalary/workingDays);  
    console.log('Leavededuction is',leavededuction)
    givensalary=basicsalary-leavededuction;
    }else if(absentdays<paidleaves){
    givensalary=basicsalary
   
    }
    res.json({message:"Given salary is",givensalary}) 


    
}

module.exports= {GenerateSlip};