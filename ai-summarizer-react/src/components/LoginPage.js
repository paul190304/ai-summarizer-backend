import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/summarizer');
  };
  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1>AI Summarizer</h1>
      <form onSubmit={handleLogin}>
        <motion.input type="email" placeholder="Email (any email will work)" whileFocus={{ scale: 1.05 }} />
        <motion.input type="password" placeholder="Password (any password)" whileFocus={{ scale: 1.05 }} />
        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Login
        </motion.button>
      </form>
    </motion.div>
  );
}
export default LoginPage;