import React, { useState, useEffect, useContext } from 'react';
import { Badge, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserContext from '../UserContext';
import QRCode from '../assets/QR.jpg';

function ProjectCard({ project }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [showPayModal, setShowPayModal] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        const paidProjects = JSON.parse(localStorage.getItem('paidProjects') || '[]');
        setIsPaid(paidProjects.includes(project.id));
    }, [project.id]);

    const getBadgeColor = (status) => {
        if (status === 'Accepted') return 'primary';
        if (status === 'Rejected') return 'danger';
        if (status === 'Completed') return 'success';
        return 'primary';
    };

    const handlePayment = (e) => {
        e.stopPropagation();
        setShowPayModal(true);
    };

    const markAsPaid = () => {
        const paidProjects = JSON.parse(localStorage.getItem('paidProjects') || '[]');
        paidProjects.push(project.id);
        localStorage.setItem('paidProjects', JSON.stringify(paidProjects));
        setIsPaid(true);
        setShowPayModal(false);
    };

    const shouldShowPayButton = project.status === 'Completed' && !isPaid && user?.role !== 'Admin';

    return (
        <>
        <motion.div 
            className="project-card"
            onClick={() => navigate(`/project/${project.id}`)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <h4 className="project-card-name">{project.title}</h4>
            
            <div className="project-card-info">
                <span className="project-card-label">Created:</span> {new Date(project.creationDate).toLocaleDateString()}
            </div>
            
            <div className="project-card-info">
                <span className="project-card-label">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
            </div>
            
            <div className="project-card-info">
                <span className="project-card-label">Price:</span> ₹{project.price}
            </div>

            <div style={{ marginTop: '16px' }}>
                {shouldShowPayButton ? (
                    <div>
                        <div className="project-card-status" style={{ background: '#fff3cd', color: '#856404', marginBottom: '12px' }}>
                            Payment Pending
                        </div>
                        <motion.button 
                            className="dashboard-submit-btn"
                            style={{ width: '100%', padding: '8px 16px', fontSize: '14px' }}
                            onClick={handlePayment}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Pay Now
                        </motion.button>
                    </div>
                ) : (
                    <div 
                        className="project-card-status"
                        style={{
                            background: project.status === 'Completed' ? '#d1e7dd' : 
                                       project.status === 'Accepted' ? '#cff4fc' :
                                       project.status === 'Rejected' ? '#f8d7da' : '#f2f2f7',
                            color: project.status === 'Completed' ? '#0f5132' :
                                   project.status === 'Accepted' ? '#055160' :
                                   project.status === 'Rejected' ? '#842029' : '#424245'
                        }}
                    >
                        {project.status === 'Completed' && isPaid ? 'Completed' : project.status}
                    </div>
                )}
            </div>
        </motion.div>

        <Modal 
            show={showPayModal} 
            onHide={() => setShowPayModal(false)} 
            centered
            className="dashboard-modal"
        >
            <Modal.Header closeButton style={{ border: 'none', paddingBottom: 0 }}>
                <Modal.Title style={{ fontSize: '20px', fontWeight: '600', color: '#1d1d1f' }}>
                    Payment for {project.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center" style={{ padding: '24px' }}>
                <h5 className="mb-3" style={{ color: '#424245', fontWeight: '500' }}>
                    Scan QR to Pay ₹{project.price}
                </h5>
                <div style={{ 
                    width: '200px', 
                    height: '200px', 
                    margin: '0 auto 16px', 
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    overflow: 'hidden'
                }}>
                    <img 
                        src={QRCode} 
                        alt="QR Code for Payment" 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            border: 'none'
                        }} 
                    />
                </div>
                <p style={{ color: '#6e6e73', fontSize: '14px', margin: 0 }}>
                    Scan with any UPI app
                </p>
            </Modal.Body>
            <Modal.Footer style={{ border: 'none', padding: '0 24px 24px' }}>
                <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowPayModal(false)}
                    style={{ 
                        borderRadius: '12px', 
                        padding: '8px 20px',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        color: '#424245'
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    className="dashboard-submit-btn"
                    onClick={markAsPaid}
                    style={{ borderRadius: '12px', padding: '8px 20px' }}
                >
                    Done Payment
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ProjectCard; 