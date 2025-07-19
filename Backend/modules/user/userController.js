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

const updateProfile = async (req, res) => {
  const db = getDB();
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: 'Invalid user' });

  const {
    name,
    email,
    mobile,
    address,
    bankAccount,
    gender,
    IFSC,
    emergencyContact,
    emergencyContactname,
  } = req.body;

  // Dynamically construct update fields
  const updateFields = {};

  if (name !== undefined) updateFields.username = name;
  if (email !== undefined) updateFields.email = email;
  if (mobile !== undefined) updateFields.mobile = mobile;
  if (address !== undefined) updateFields.address = address;
  if (bankAccount !== undefined) updateFields.bankAccount = bankAccount;
  if (gender !== undefined) updateFields.gender = gender;
  if (IFSC !== undefined) updateFields.IFSC = IFSC;
  if (emergencyContact !== undefined) updateFields.emergencyContact = emergencyContact;
  if (emergencyContactname !== undefined) updateFields.emergencyContactname = emergencyContactname;

  try {
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    const result = await db.collection('users').updateOne(
      { user_id: userId },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addUser = async (req, res) => {
  try {
    const db = getDB();
    const {
      name,
      gender,
      id,
      joigningDate,
      designation,
      address,
    bankAccount,
    mobile,
    email,
    password,
    role,
    salary,
    employmentType,
    attendanceType,
    emergencyContact,
    emergencyContactname,
    IFSC,
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
      designation,
      salary,
      employmentType,
      attendanceType,
      role,
        emergencyContact,
    emergencyContactname,
          joigningDate,
      designation,
            gender,
            IFSC,
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

const userByitsId = async (req,res)=>{
  const db=getDB();

  const {userid}=req.params;
  console.log("id recieved is",req.params);
  try{
    const user=await db.collection('users').findOne(
      {user_id:userid},
      {projection: { password: 0 } }
    )
    if(!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User fetched successfully', user });
  }
  catch(error){
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = { getProfile, addUser, alluser,userByitsId,updateProfile};