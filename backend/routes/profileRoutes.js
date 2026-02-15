// backend/routes/profileRoutes.js
const express = require('express');
const router = express.Router();

// In-memory storage (replace with database later)
let userProfile = {
  photo: null,
  name: 'Shreyash Shirsikar',
  mobile: '+91 98765 43210',
  email: 'shreyashshirsikar@gmail.com',
  location: 'Dindori Taluka, Nashik',
  farmSize: '12.5 acres',
  language: 'en',
  memberSince: 'January 2026'
};

// Get profile
router.get('/', (req, res) => {
  res.json(userProfile);
});

// Update profile
router.put('/', (req, res) => {
  const { name, mobile, email, location, farmSize, language, photo } = req.body;
  
  // Update only provided fields
  if (name !== undefined) userProfile.name = name;
  if (mobile !== undefined) userProfile.mobile = mobile;
  if (email !== undefined) userProfile.email = email;
  if (location !== undefined) userProfile.location = location;
  if (farmSize !== undefined) userProfile.farmSize = farmSize;
  if (language !== undefined) userProfile.language = language;
  if (photo !== undefined) userProfile.photo = photo;
  
  res.json({ 
    message: 'Profile updated successfully',
    profile: userProfile 
  });
});

module.exports = router;