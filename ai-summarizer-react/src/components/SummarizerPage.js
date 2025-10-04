import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SummarizerPage.css';

function SummarizerPage() {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let timer;
        if (showCountdown && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (showCountdown && countdown === 0) {
            setShowCountdown(false);
        }
        return () => clearTimeout(timer);
    }, [showCountdown, countdown]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setSummary('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first.');
            return;
        }
        setError('');
        setSummary('');
        setIsLoading(true);

        // --- REAL BACKEND CALL using fetch ---
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/summarize', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            
            setSummary(data.summary);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div className="summarizer-container" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
            <h1>✨ AI Document Summarizer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file-input" className="drop-area">{file ? file.name : 'Drag & Drop or Click to Upload'}</label>
                <input id="file-input" type="file" onChange={handleFileChange} />
                <motion.button type="submit" disabled={isLoading} whileHover={{ scale: isLoading ? 1 : 1.05 }} whileTap={{ scale: isLoading ? 1 : 0.95 }}>
                    {isLoading ? 'Analyzing...' : 'Summarize'}
                </motion.button>
            </form>
            
            {/* The animated processing icon is now tied to the real loading state */}
            <AnimatePresence>
                {isLoading && (<motion.div className="processing-animation" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>📄</motion.div>)}
            </AnimatePresence>

            <div className="result-box">
                {/* We don't need the countdown anymore, but you can add it back if you like */}
                {summary && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2>Summary</h2>
                        <div className="summary-content">{summary}</div>
                    </motion.div>
                )}
                {error && <div className="error-content">{error}</div>}
            </div>
        </motion.div>
    );
}

export default SummarizerPage;