const { getDB } = require('../../config/db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const getProfile = async (req, res) => {
  const db = getDB();

  if (!req.user || !req.user.userId)
    return res.status(400).json({ message: 'Invalid user' });

  const user = await db.collection('users').findOne(
    { _id: new ObjectId(req.user.user_id) },
    { projection: { password: 0 } }
  );

  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ user });
};



const addUser = async (req, res) => {
  try {
    const db = getDB();
    const {
      name,
      id,
      address,
      bankAccount,
      mobile,
      email,
      password,
      role,
      salary,
      employmentType,
      attendanceType,
    } = req.body;

    // Basic validation
    if (!name || !id || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate email or ID
    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { user_id: id }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      username: name,
      user_id: id,
      address,
      bankAccount,
      mobile,
      email,
      password: hashedPassword,
      employee_role: role,
      salary,
      employmentType,
      attendanceType,
      role: 'HR',
    });

    res.status(201).json({
      message: 'User added successfully',
      userId: result.insertedId,
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const alluser = async (req,res)=>{
  const db = getDB();
  try{
    const users = await db.collection('users').find().project({ password: 0 }).toArray();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json({message:"User fetched sucessfully", users});
    

  }catch(error){
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getProfile, addUser, alluser };
