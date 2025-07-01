import React, {useContext, useState} from 'react';
import { Container, Form, Button, Card, Modal, Spinner } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../UserContext.jsx";
import { SyncLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import './Login.css';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setShowLoadingModal(true);
        
        console.log('Email:', email, 'Password:', password);

        try {
            let res = await axios.get("http://localhost:8080/Users")
            let users = res.data;

            const match = users.find(
                
                (user) => user.email === email && user.password === password
            );

            if (match) {
                if(match.role === "Admin"){
                    setUser(match);
                    navigate("/AdminDashboard")
                }else {
                    console.log("User Logged")
                    setUser(match);
                    navigate("/dashboard")
                }
            } else {
                setShowLoadingModal(false);
                alert("Incorrect Credentials")
            }
        } catch (error) {
            setShowLoadingModal(false);
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };



    return (
        <>
            <div className="login-container">
                <motion.div 
                    className="login-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <motion.h3 
                        className="login-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Sign In
                    </motion.h3>
                    
                    <form onSubmit={handleLogin}>
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
                                value={email}
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </motion.div>

                        <motion.button 
                            type="submit" 
                            className="login-button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: "easeOut" }}
                        >
                            Sign In
                        </motion.button>
                    </form>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link className="register-link" to="/register">
                            New to WorkLancer? Create an account
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {showLoadingModal && (
                <motion.div 
                    className="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1050
                    }}
                >
                    <motion.div 
                        className="loading-modal"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            borderRadius: '16px',
                            padding: '40px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div className="loading-spinner"></div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}

export default Login;
