import React, { useState, useEffect, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ComposeEmailModal.css';
import { useSelector } from 'react-redux';

const ComposeEmailPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(null);
  const currentUserEmail = useSelector((state) => state.auth.user?.email);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const emailData = {
        sender: currentUserEmail,
        reciever: email,
        subject,
        message: editorState?.getCurrentContent().getPlainText() || '',
      };

      const sanitizedSenderEmail = currentUserEmail.replace(/[@.]/g, '');
      const sanitizedRecipientEmail = email.replace(/[@.]/g, '');

      const sentboxResponse = await fetch(`https://mail-box-cf1f8-default-rtdb.firebaseio.com/${sanitizedSenderEmail}/sentbox.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!sentboxResponse.ok) {
        throw new Error('Failed to save in sentbox');
      }

      if (isMounted.current) {
        const inboxResponse = await fetch(`https://mail-box-cf1f8-default-rtdb.firebaseio.com/${sanitizedRecipientEmail}/inbox.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        if (!inboxResponse.ok) {
          throw new Error('Failed to save in inbox');
        }
      }

      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="container">
      <div className="popup-container">
        <div className="popup-header">
          <span className="font-weight-bold">Compose Email</span>
          <FontAwesomeIcon icon={faTimes} onClick={onClose} className="close-icon" />
        </div>
        <div className="popup-body">
          <div className="form-group">
            <label htmlFor="email">Recipient's Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <Editor
              editorState={editorState}
              onEditorStateChange={(state) => isMounted.current && setEditorState(state)}
            />
          </div>
        </div>
        <div className="popup-footer">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmailPopup;
