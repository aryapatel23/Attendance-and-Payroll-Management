const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({path:'./auth.env'});
console.log("MONGO_URI:", process.env.MONGO_URI); 
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
const dbName = 'Attendance';
let db;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
      const client = new MongoClient(mongoURI);
      await client.connect();
      console.log('Authentication is Connected to MongoDB');
      db = client.db(dbName);
      
      // Create indexes for unique fields
      await db.collection('users').createIndex({ username: 1 }, { unique: true });
      await db.collection('users`').createIndex({ email: 1 }, { unique: true });
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  }


  // Initialize MongoDB connection
connectToMongoDB();

// Environment variables (use dotenv in production)
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
const JWT_EXPIRES_IN =process.env.JWT_EXPIRES_IN || '7d';
console.log("JWT Secret Key is new:", JWT_SECRET);

//Login route 
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password ,id} = req.body;
      
      if (!username ) {
        return res.status(400).json({ message: 'Username are required' });
      }else if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }else if (!id) {
        return res.status(400).json({ message: 'ID is required' });
      }
  
      // Ensure MongoDB is connected
      if (!db) {
        return res.status(500).json({ message: 'Database connection error' });
      }
  
      // Find user in database
      const user = await db.collection('users').findOne({ username });
      console.log('🔍 User found:', user);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials user not' });
      }
  
      // Validate password
      console.log('🔑 Entered password:', password);
      console.log('🔑 Stored hashed password:', user.password);

      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials password ' });
      }
      if (user.id !== id) {
        return res.status(401).json({ message: 'Invalid credentials id'});
      }
  
      // Create JWT token
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } // ✅ Fixed syntax error
      );
  
      console.log('🛡️ JWT Secret:', JWT_SECRET);
      console.log('🔐 Token Generated:', token);
    
  
      // Send response
      res.json({
        message: '✅ Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role.toLowerCase(),          
        }
      });
      
  
    } catch (error) {
      console.error('❌ Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  

  const authenticateToken = (req, res, next) => {
    // Get token from cookies or Authorization header
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Add user data to request
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };

    app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: 'Invalid request. No user ID found.' });
        }

        console.log('🔍 Extracted User ID:', req.user.userId);

        // Convert userId to ObjectId
        const userId = new ObjectId(req.user.userId);

        // Find user in the database, excluding password
        const user = await db.collection('users').findOne(
            { _id: userId },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('❌ Profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


    const PORT = process.env.PORT || 4500;
  app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});