import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './LoginPage';
import SummarizerPage from './SummarizerPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/summarizer" element={<SummarizerPage />} />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;