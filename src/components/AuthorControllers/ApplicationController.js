import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const { db } = require('../config/firebase');

exports.applyToJob = async (req, res) => {
  try {
    const application = {
      jobId: req.params.jobId,
      applicantId: req.user.uid,
      appliedAt: new Date(),
    };

    const ref = await db.collection('applications').add(application);
    res.status(201).json({ id: ref.id, ...application });
  } catch (error) {
    res.status(500).json({ message: 'Application failed', error });
  }
};
