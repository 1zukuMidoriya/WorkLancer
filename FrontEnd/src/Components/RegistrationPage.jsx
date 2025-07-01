import React, {useState} from 'react';
import { Button, Card, Container, Form} from 'react-bootstrap';
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import './RegistrationPage.css';

function RegisterPage() {
    const [thisname, setName] = useState('');
    const [thisemail, setEmail] = useState('');
    const [thispassword, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return { valid: false, message: 'Password must be at least 8 characters long' };
        }
        if (!hasUpperCase) {
            return { valid: false, message: 'Password must contain at least one uppercase letter' };
        }
        if (!hasLowerCase) {
            return { valid: false, message: 'Password must contain at least one lowercase letter' };
        }
        if (!hasNumbers) {
            return { valid: false, message: 'Password must contain at least one number' };
        }
        if (!hasSpecialChar) {
            return { valid: false, message: 'Password must contain at least one special character' };
        }
        return { valid: true, message: '' };
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        const passwordValidation = validatePassword(thispassword);
        if (!passwordValidation.valid) {
            setToastMessage(passwordValidation.message);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        console.log('Name:', thisname, 'Email:', thisemail, 'Password:', thispassword);

        axios.post('http://localhost:8080/Users',{
            name: thisname,
            email: thisemail,
            password: thispassword
        }).then(function (response){
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        })
        alert("Registration successful")

    navigate("/");

        
    };

    return (
        <div className="register-container">
            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        className="toast-notification"
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <motion.div 
                            className="toast-icon"
                            initial={{ rotate: -180 }}
                            animate={{ rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            ⚠️
                        </motion.div>
                        <div className="toast-content">
                            <div className="toast-title">Invalid Password</div>
                            <div className="toast-message">{toastMessage}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className="register-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.h3 
                    className="register-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut" }}
                >
                    Create Account
                </motion.h3>
                
                <form onSubmit={handleRegister}>
                    <motion.div 
                        className="form-group-custom"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter your name"
                            value={thisname}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="form-group-custom"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="name@example.com"
                            value={thisemail}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className="form-group-custom"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Create a strong password"
                            value={thispassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <motion.p 
                            className="password-hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Use 8+ characters with uppercase, lowercase, numbers & symbols
                        </motion.p>
                    </motion.div>

                    <motion.button 
                        type="submit" 
                        className="register-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeInOut" }}
                    >
                        Create Account
                    </motion.button>
                </form>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut" }}
                >
                    <Link className="login-link" to="/">
                        Already have an account? Sign in
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default RegisterPage;
