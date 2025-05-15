import {db} from '../config/firebase';
import { initializeApp } from 'firebase-admin/app';

const { auth, db } = require('../firebaseConfig');

// Register User (Job Seeker or Employer)
async function registerUser(req, res) {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: "Email, password, and role are required." });
    }

    try {
        const userRecord = await auth.createUser({
            email,
            password,
            emailVerified: false,
        });

        // Set role as custom claims
        await auth.setCustomUserClaims(userRecord.uid, { role });

        // Save basic user info to Firestore
        await db.collection('users').doc(userRecord.uid).set({
            email,
            role,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({
            message: `User registered as ${role}`,
            uid: userRecord.uid,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// 📌 Send Password Reset Email
const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const link = await auth.generatePasswordResetLink(email);
    res.status(200).json({ message: "Password reset link sent", link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Send Email Verification Link
const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const link = await auth.generateEmailVerificationLink(email);
    res.status(200).json({ message: "Verification email sent", link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get User Role by UID
const getUserRole = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await auth.getUser(uid);
    const role = user.customClaims?.role || "none";
    res.status(200).json({ uid, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  resetPassword,
  sendVerificationEmail,
  getUserRole,
};
