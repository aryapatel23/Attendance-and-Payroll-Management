const { getDB } = require("../../config/db");

const GenerateSlip = async (req, res) =>{

      const db = getDB();
      const { user_id, month } = req.body;
      const user = await db.collection('users').findOne({ user_id });
      if (!user) return res.status(404).json({ message: 'User not found' });

    const attendance = await db.collection('attendance').find({
    employee_id,
    date: { $regex: `^${month}` }
    }).toArray();
    
    console.log('Fetched data is',attendance)

}

module.exports= {GenerateSlip} ;