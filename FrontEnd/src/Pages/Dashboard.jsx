import React, {useContext, useState} from 'react'
import {Container, Navbar, Nav, Button} from "react-bootstrap";
import UserContext from "../UserContext.jsx";
import CreateProject from "./CreateProject.jsx";
import AllProjects from "./AllProjects.jsx";
import {useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';
import './Dashboard.css';

function Dashboard() {
    const { setUser, user } = useContext(UserContext)
    const [projects, setProjects] = useState("AllProjects")
    const navigate = useNavigate()

    function GetAllProjects(){
      setProjects("AllProjects")
    }

    function GetCreateProject() {
        setProjects("CreateProject")
    }

    function handleLogout() {
        // Clear user data and redirect to login
        setUser(null)
        navigate("/")
    }

    return (
        <div className="dashboard-container">
            <Navbar className="dashboard-navbar">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="dashboard-navbar-brand"
                            onClick={GetAllProjects}>
                            <span className="dashboard-navbar-welcome">Hello,</span> {user.name}
                        </h3>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Nav className="ms-auto">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Nav.Link 
                                    onClick={GetAllProjects} 
                                    className={`dashboard-nav-link ${projects === "AllProjects" ? 'dashboard-nav-link-active' : ''}`}
                                >
                                    All Projects
                                </Nav.Link>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Nav.Link 
                                    onClick={GetCreateProject} 
                                    className={`dashboard-nav-link ${projects === "CreateProject" ? 'dashboard-nav-link-active' : ''}`}
                                >
                                    Sent Projects
                                </Nav.Link>
                            </motion.div>
                            
                            <Button
                                className="dashboard-logout-btn"
                                onClick={handleLogout}
                                as={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Logout
                            </Button>
                        </Nav>
                    </motion.div>
                </Container>
            </Navbar>

            <Container className="content-container">
                <motion.div 
                    className="dashboard-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {
                        projects === "AllProjects" ? <AllProjects/> : <CreateProject onProjectSent={GetAllProjects}/>
                    }
                </motion.div>
            </Container>
        </div>
    );
}

export default Dashboard;
