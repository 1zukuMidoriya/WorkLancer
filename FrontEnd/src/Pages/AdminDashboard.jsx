import React, { useState, useEffect, useContext } from 'react'
import { Container, Navbar, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import UserContext from "../UserContext.jsx";
import './AdminDashboard.css'

function AdminDashboard() {
  const [users, setUsers] = useState(null)
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    axios.get('http://localhost:8080/Users')
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const handleUserClick = (userId) => {
    navigate(`/user-details/${userId}`)
  }

  const refreshPage = () => {
    window.location.reload()
  }

  const nonAdminUsers = users ? users.filter(u => (u.role !== 'Admin')) : []

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
    <div className="admin-container">
      <Navbar className="admin-navbar">
        <Container>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 onClick={refreshPage} style={{cursor: 'pointer'}} className="admin-navbar-brand">
              <span  className="admin-navbar-welcome">Hello,</span> Freelancer
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              className="admin-logout-btn"
              onClick={handleLogout}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Logout
            </Button>
          </motion.div>
        </Container>
      </Navbar>

      <Container className="content-container">
        {!users ? (
          <div className="admin-loading-container">
            <div className="admin-loading-spinner"></div>
          </div>
        ) : (
          <>
            <motion.h2 
              className="admin-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              All Clients
            </motion.h2>
            
            <motion.div 
              className="row"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {nonAdminUsers.map((user) => (
                <motion.div 
                  className="col-md-4 mb-4" 
                  key={user.id}
                  variants={cardVariants}
                >
                  <motion.div 
                    className="client-card"
                    onClick={() => handleUserClick(user.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h4 className="client-card-name">{user.name}</h4>
                    <div className="client-card-info">
                      <span className="client-card-label">Email:</span> {user.email}
                    </div>
                    <div className="client-card-project-count">
                      {user.project ? user.project.length : 0} Projects
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {nonAdminUsers.length === 0 && (
              <motion.p 
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                No clients found
              </motion.p>
            )}
          </>
        )}
      </Container>
    </div>
  )
}

export default AdminDashboard