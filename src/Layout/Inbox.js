import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReceivedMails } from '../Reducer/MailSlice';
import './Inbox.css';

function Inbox() {
    const currentUserEmail = useSelector((state) => state.auth.user?.email);
    const receivedMails = useSelector((state) => state.mail.receivedMails);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmails, setFilteredEmails] = useState([]);

    const fetchReceivedEmails = useCallback(async () => {
        try {
            const sanitizedRecipientEmail = currentUserEmail.replace(/[@.]/g, '');
            const response = await fetch(`https://mail-box-cf1f8-default-rtdb.firebaseio.com/${sanitizedRecipientEmail}/inbox.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch inbox');
            }
            const data = await response.json();
            console.log('Fetched Data:', data);

            if (data) {
                const email = {
                    sender: data.sender,
                    receiver: data.receiver,
                    subject: data.subject,
                    message: data.message,
                    timestamp: data.timestamp
                };
                console.log('Mapped Emails:', email);
                dispatch(setReceivedMails([email]));
            }
        } catch (error) {
            console.error('Error fetching received emails:', error);
        }
    }, [currentUserEmail, dispatch]);

    useEffect(() => {
        fetchReceivedEmails();
    }, [fetchReceivedEmails]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredEmails(receivedMails);
        } else {
            const filtered = receivedMails.filter(email =>
                email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (email.message && email.message.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredEmails(filtered);
        }
    }, [searchQuery, receivedMails]);

    const handleEmailClick = (emailId) => {
        console.log('Viewing email:', emailId);
    };

    return (
        <div className='inbox-container'>
            <div className="inbox-header">
                <h2>Inbox</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search emails..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <ul className="email-list">
                {filteredEmails.map((email, index) => (
                    <li key={index} className="email-item" onClick={() => handleEmailClick(email.id)}>
                        {email.sender}
                        {email.subject}
                        {email.message ? email.message.substring(0, 100) : ''}
                        {email.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inbox;
