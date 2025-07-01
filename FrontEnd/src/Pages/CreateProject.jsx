import React, {useState, useContext} from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from 'axios'
import UserContext from "../UserContext.jsx";
import { motion } from 'framer-motion';

function CreateProject({ onProjectSent }) {
    const { user } = useContext(UserContext)
    const [projectData, setProjectData] = useState({
        title: '',
        dataLink: '',
        deadline: '',
        price: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        
        
        if (name === 'deadline') {
            const selectedDate = new Date(value)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            
            if (selectedDate < today) {
                alert('Deadline cannot be in the past!')
                return
            }
        }
        
        setProjectData({
            ...projectData,
            [name]: value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!user || !user.id) {
            alert('Please login first!')
            return
        }
        
        axios.post(`http://localhost:8080/Projects/${user.id}`, {
            ...projectData,
            price: parseInt(projectData.price),
            status: 'Pending'
        })
        .then(() => {
            alert('Project sent successfully!')
            setProjectData({
                title: '',
                dataLink: '',
                deadline: '',
                price: ''
            })
            if (onProjectSent) {
                onProjectSent()
            }
        })
        .catch(error => {
            alert('Something went wrong!')
            console.error(error)
        })
    }
    
    return (
        <>
            <motion.h2 
                className="dashboard-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                Create New Project
            </motion.h2>

            <motion.div 
                className="row justify-content-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="col-md-8">
                    <motion.div 
                        className="project-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Form onSubmit={handleSubmit}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <Form.Group className="mb-3">
                                    <Form.Label className="project-card-label">Project Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={projectData.title}
                                        onChange={handleChange}
                                        className="dashboard-form-input"
                                        placeholder="Enter project title"
                                        required
                                    />
                                </Form.Group>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <Form.Group className="mb-3">
                                    <Form.Label className="project-card-label">Description / Links</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="dataLink"
                                        value={projectData.dataLink}
                                        onChange={handleChange}
                                        className="dashboard-form-input"
                                        placeholder="Add description or any relevant links"
                                    />
                                </Form.Group>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <Form.Group className="mb-3">
                                    <Form.Label className="project-card-label">Deadline</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="deadline"
                                        value={projectData.deadline}
                                        onChange={handleChange}
                                        className="dashboard-form-input"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </Form.Group>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                            >
                                <Form.Group className="mb-4">
                                    <Form.Label className="project-card-label">Price (₹)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={projectData.price}
                                        onChange={handleChange}
                                        className="dashboard-form-input"
                                        placeholder="Enter project price"
                                        required
                                    />
                                </Form.Group>
                            </motion.div>

                            <motion.button 
                                type="submit" 
                                className="dashboard-submit-btn w-100"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                            >
                                Send Project
                            </motion.button>
                        </Form>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default CreateProject
