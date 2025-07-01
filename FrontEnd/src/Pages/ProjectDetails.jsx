import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserContext from '../UserContext';
import axios from 'axios';

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/Projects/project/${id}`)
            .then(res => {
                setProject(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        
        if (!comment.trim()) return;

        axios.post(`http://localhost:8080/Comments/${id}`, {
            comment: comment,
            user: { id: user?.id }
        })
        .then(res => {
            return axios.get(`http://localhost:8080/Projects/project/${id}`);
        })
        .then(res => {
            setProject(res.data);
            setComment('');
        })
        .catch(err => console.error(err));
    };

    if (loading) {
        return (
            <div className="dashboard-loading-container">
                <div className="dashboard-loading-spinner"></div>
            </div>
        )
    }
    
    if (!project) {
        return (
            <div className="dashboard-container">
                <Container className="content-container">
                    <h3 className="dashboard-title">Project not found</h3>
                </Container>
            </div>
        )
    }

    return (
        <div className="dashboard-container">
            <Container className="content-container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Button 
                        className="dashboard-logout-btn mb-4"
                        onClick={() => navigate('/dashboard')}
                        as={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        ← Back
                    </Button>
                </motion.div>

                <motion.h2 
                    className="dashboard-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    Project Details
                </motion.h2>

                <motion.div 
                    className="project-card mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >
                    <h4 className="project-card-name">{project.title}</h4>
                    
                    <div className="project-card-info">
                        <span className="project-card-label">Price:</span> ₹{project.price}
                    </div>
                    
                    <div className="project-card-info">
                        <span className="project-card-label">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
                    </div>
                    
                    {project.dataLink && (
                        <div className="project-card-info">
                            <span className="project-card-label">Description:</span>
                             {project.dataLink}
                            
                        </div>
                    )}

                    <div className="project-card-status">
                        {project.status || 'Open'}
                    </div>
                </motion.div>

                <motion.div 
                    className="project-card mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <h4 className="project-card-name">Add Comment</h4>
                    
                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="dashboard-form-input"
                            />
                        </Form.Group>
                        <motion.button 
                            type="submit" 
                            className="dashboard-submit-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Post Comment
                        </motion.button>
                    </Form>
                </motion.div>

                <motion.div 
                    className="project-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <h4 className="project-card-name">Comments</h4>
                    
                    {project.comments && project.comments.length > 0 ? (
                        <div style={{ marginTop: '20px' }}>
                            {project.comments.map((c, index) => (
                                <motion.div 
                                    key={c.id}
                                    className={`comment-item ${c.user?.role === 'Admin' ? 'admin-comment' : 'client-comment'}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                                >
                                    <p className="comment-text">{c.comment}</p>
                                    <small className="comment-author">
                                        By: {c.user?.name || 'Client'} 
                                        {c.user?.role === 'Admin' && ' (Freelancer)'}
                                    </small>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.p 
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                        >
                            No comments yet
                        </motion.p>
                    )}
                </motion.div>
            </Container>
        </div>
    );
}

export default ProjectDetails; 