import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Reducer/authSlice';
import Inbox from '../Layout/Inbox'; 
import ComposeEmailPopup from '../Layout/ComposeEmailModal';
import './Welcome.css';

function Welcome() {
    const [showPopup, setShowPopup] = useState(false);
    const [showInbox, setShowInbox] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleComposeClick = () => {
        setShowPopup(true);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    
    const handleComposeClose = () => {
        setShowPopup(false);
    };

    const handleInboxClick = () => {
        setShowInbox(!showInbox);
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <h1 className="welcome-title">Welcome to Our Mail Box</h1>
                <button className="logout-button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                </button>
            </nav>
            <div className="row">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <div className="compose-button" onClick={handleComposeClick}>
                                    <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> Compose
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="inbox-button" onClick={handleInboxClick}>
                                    Inbox
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="content">
                        {showPopup && <ComposeEmailPopup onClose={handleComposeClose}/>}
                        {showInbox && <Inbox />}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Welcome;
