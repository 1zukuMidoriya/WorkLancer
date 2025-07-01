import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

function UserProjects({ projects, onProjectUpdate }) {
  const navigate = useNavigate()
  
  const updateStatus = async (projectId, status) => {
    try {
      await axios.put(`http://localhost:8080/Projects/${projectId}/status/${status}`)
      onProjectUpdate()
    } catch (err) {
      console.error(err)
    }
  }

  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <>
      <motion.h2 
        className="dashboard-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Client Projects
      </motion.h2>
      
      {projects && projects.length > 0 ? (
        <motion.div 
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {projects.map((project) => (
            <motion.div 
              className="col-md-6 mb-4" 
              key={project.id}
              variants={cardVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.div 
                className="project-card"
                onClick={() => navigate(`/admin/project/${project.id}`)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="project-card-name">{project.title}</h4>
                
                <div className="project-card-info">
                  <span className="project-card-label">Created:</span> {new Date(project.creationDate).toLocaleDateString('en-IN')}
                </div>
                
                <div className="project-card-info">
                  <span className="project-card-label">Price:</span> ₹{project.price}
                </div>

                <div 
                  className="project-card-status"
                  style={{
                    background: project.status === 'Completed' ? '#d1e7dd' : 
                               project.status === 'Accepted' ? '#cff4fc' :
                               project.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                    color: project.status === 'Completed' ? '#0f5132' :
                           project.status === 'Accepted' ? '#055160' :
                           project.status === 'Rejected' ? '#842029' : '#856404'
                  }}
                >
                  {project.status}
                </div>

                {project.status === 'Pending' && (
                  <motion.div 
                    style={{ marginTop: '16px', display: 'flex', gap: '8px' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <motion.button 
                      className="dashboard-accept-btn"
                      style={{ 
                        flex: 1, 
                        padding: '8px 16px', 
                        fontSize: '14px',
                        background: '#198754 !important',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        updateStatus(project.id, 'Accepted')
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ✓ Accept
                    </motion.button>
                    <motion.button 
                      className="dashboard-reject-btn"
                      style={{ 
                        flex: 1, 
                        padding: '8px 16px', 
                        fontSize: '14px',
                        background: '#dc3545 !important',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        updateStatus(project.id, 'Rejected')
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ✕ Reject
                    </motion.button>
                  </motion.div>
                )}

                {project.status === 'Accepted' && (
                  <motion.div 
                    style={{ marginTop: '16px' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <motion.button 
                      className="dashboard-submit-btn"
                      style={{ 
                        width: '100%', 
                        padding: '8px 16px', 
                        fontSize: '14px'
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        updateStatus(project.id, 'Completed')
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ✓ Mark as Complete
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No projects assigned
        </motion.p>
      )}
    </>
  )
}

export default UserProjects 