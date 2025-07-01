import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import ProjectCard from "../Components/ProjectCard.jsx";
import axios from 'axios'
import UserContext from "../UserContext.jsx";
import { motion } from 'framer-motion';

function AllProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            // Agar Admin hai to sabhi projects fetch karo, warna sirf user ke projects
            const url = user.role === 'Admin' 
                ? 'http://localhost:8080/Projects'
                : `http://localhost:8080/Projects/${user.id}`
                
            axios.get(url)
                .then(response => {
                    setProjects(response.data)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [user])

    // Animation variants
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

    if (loading) {
        return (
            <div className="dashboard-loading-container">
                <div className="dashboard-loading-spinner"></div>
            </div>
        )
    } else {
        return (
            <>
                <motion.h2 
                    className="dashboard-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {user?.role === 'Admin' ? 'All Projects' : 'My Projects'}
                </motion.h2>
                
                <motion.div 
                    className="row"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {projects.map((project) => (
                        <motion.div 
                            className="col-md-4 mb-4" 
                            key={project.id}
                            variants={cardVariants}
                        >
                            <ProjectCard project={project}/>
                        </motion.div>
                    ))}
                </motion.div>

                {projects.length === 0 && (
                    <motion.p 
                        className="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        No projects found
                    </motion.p>
                )}
            </>
        )
    }
}

export default AllProjects
