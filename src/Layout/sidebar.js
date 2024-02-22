import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInbox } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ onComposeClick, onInboxClick }) {
  const handleComposeClick = () => {
    onComposeClick();
  };

  const handleInboxClick = () => {
    onInboxClick();
  };

  return (
    <div className="sidebar">
      <div className="d-flex flex-column align-items-center p-3">
        <button className="btn btn-primary mb-3" onClick={handleComposeClick}>
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Compose
        </button>
        <button className="btn btn-light" onClick={handleInboxClick}>
          <FontAwesomeIcon icon={faInbox} className="mr-2" />
          Inbox
        </button>
      </div>
    </div>
  );
}

export default Sidebar;