import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTAButtons = () => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to="/register" className="btn btn-light btn-lg px-4 py-2 rounded-3 shadow">
          Join as Job Seeker
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to="/employer-register" className="btn btn-outline-light btn-lg px-4 py-2 rounded-3 shadow">
          Hire Talent
        </Link>
      </motion.div>
    </div>
  );
};

export default CTAButtons;
