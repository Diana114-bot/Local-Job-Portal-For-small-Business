import express from 'express';
import { registerUser, resetPassword, sendVerificationEmail, getUserRole } from '../AuthorController';


const express = require('express');
const router = express.Router();
const {
  registerUser,
  resetPassword,
  sendVerificationEmail,
  getUserRole
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/reset-password', resetPassword);
router.post('/verify-email', sendVerificationEmail);
router.get('/role/:uid', getUserRole);

module.exports = router;

