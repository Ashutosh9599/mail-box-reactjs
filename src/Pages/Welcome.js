import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComposeEmailPopup from '../Layout/ComposeEmailModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Reducer/authSlice';
import './Welcome.css';

function Welcome() {
    const [showPopup, setShowPopup] = useState(false);
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

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div>
            <div className="header-container">
                <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px', flex: 1 }}>
                    <h1 style={{ fontSize: '24px', color: '#333' }}>Welcome to Our Mail Box</h1>
                </div>
                <div>
                    <button className="logout-button" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                    </button>
                </div>
            </div>

            <div>
                {!showPopup && (
                    <button className="compose-button" onClick={handleComposeClick}>
                        <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> Compose
                    </button>
                )}

                {showPopup && <ComposeEmailPopup onClose={handleClosePopup} />}
            </div>
        </div>
    );
}

export default Welcome;
