import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReceivedMails } from '../Reducer/MailSlice';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Inbox.css';

function Inbox() {
    const currentUserEmail = useSelector((state) => state.auth.user?.email);
    const receivedMails = useSelector((state) => state.mail.receivedMails);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [starred, setStarred] = useState([]);

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
                const emails = Object.keys(data).map(key => {
                    const emailData = data[key];
                    return {
                        id: key,
                        sender: emailData.sender,
                        receiver: emailData.receiver,
                        subject: emailData.subject,
                        message: emailData.message,
                        timestamp: emailData.timestamp
                    };
                });
                console.log('Mapped Emails:', emails);
                dispatch(setReceivedMails(emails));
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

    const toggleStar = (index) => {
        const newStarred = [...starred];
        newStarred[index] = !newStarred[index];
        setStarred(newStarred);
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="inbox-container">
                        <h2>Inbox</h2>
                        <div className="action-bar">
                            <button className="delete-button">Delete</button>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                                <button type="button">Search</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <tbody>
                                    {filteredEmails.map((email, index) => (
                                        <tr key={email.id}>
                                            <td className="action"><input type="checkbox" /></td>
                                            <td className="name">
                                                <span className="star-icon" onClick={() => toggleStar(index)}>
                                                    <FontAwesomeIcon icon={faStar} style={{ color: starred[index] ? 'gold' : 'black' }} />
                                                </span>
                                                {email.sender}
                                            </td>
                                            <td className="subject">{email.subject}</td>
                                            <td className="time">{email.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inbox;
