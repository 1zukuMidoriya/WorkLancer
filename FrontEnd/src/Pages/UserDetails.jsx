import React, { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import UserProjects from '../Components/UserProjects'

function UserDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [userId])

  const fetchUserData = async () => {
    try {
      const userRes = await axios.get(`http://localhost:8080/Users/${userId}`)
      setUser(userRes.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleProjectUpdate = () => {
    fetchUserData()
  }

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <div className="dashboard-loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Container className="content-container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            className="dashboard-logout-btn mb-4"
            onClick={() => navigate('/AdminDashboard')}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back to Dashboard
          </Button>
        </motion.div>

        <motion.h2 
          className="dashboard-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Client Details
        </motion.h2>

        <motion.div 
          className="project-card mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="project-card-name">{user?.name}</h4>
          
          <div className="project-card-info">
            <span className="project-card-label">Email:</span> {user?.email}
          </div>
          
          <div className="project-card-info">
            <span className="project-card-label">Total Projects:</span> {user?.project?.length || 0}
          </div>
          
          <div className="project-card-status">
            Active Client
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <UserProjects projects={user?.project} onProjectUpdate={handleProjectUpdate} />
        </motion.div>
      </Container>
    </div>
  )
}

export default UserDetails 