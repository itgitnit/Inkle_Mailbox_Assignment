import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { mails } from '../data';
import './Mailbox.css';

const Mailbox = () => {
    // Redux state
    const searchQuery = useSelector((state) => state.searchQuery);
    const expandedMailId = useSelector((state) => state.expandedMailId);
    const selectedTag = useSelector((state) => state.selectedTag);
    const filteredMails = useSelector((state) => state.filteredMails);
    const dispatch = useDispatch();

    // React Router
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        const tag = params.get('tag');

        dispatch({ type: 'SET_SEARCH_QUERY', payload: query || '' });
        dispatch({ type: 'SET_SELECTED_TAG', payload: tag || 'all' });
    }, [dispatch, location.search]);

    useEffect(() => {
        const updatedFilteredMails = mails.filter(
            (mail) =>
                mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedTag === 'all' || mail.tag === selectedTag)
        );
        dispatch({ type: 'SET_FILTERED_MAILS', payload: updatedFilteredMails });

        const url = new URL(window.location);
        url.searchParams.set('q', searchQuery);
        url.searchParams.set('tag', selectedTag);
        window.history.pushState({}, '', url);
    }, [searchQuery, selectedTag, dispatch]);

    const toggleMail = (mailId) => {
        if (expandedMailId === mailId) {
            dispatch({ type: 'SET_EXPANDED_MAIL_ID', payload: null });
        } else {
            dispatch({ type: 'SET_EXPANDED_MAIL_ID', payload: mailId });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const url = new URL(window.location);
        url.searchParams.set('q', searchQuery);
        url.searchParams.set('tag', selectedTag);
        window.history.pushState({}, '', url);
    };

    const handleTagChange = (tag) => {
        dispatch({ type: 'SET_SELECTED_TAG', payload: tag });
    };

    return (
        <div className="mailbox">
            <div className="top-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                        placeholder="Search"
                        className="search-bar"
                    />
                </form>

                {/* Buttons */}
                <div className="button-group">
                    <button
                        className={`button ${selectedTag === 'inbox' ? 'active' : ''}`}
                        onClick={() => handleTagChange('inbox')}
                    >
                        Inbox
                    </button>
                    <button
                        className={`button ${selectedTag === 'draft' ? 'active' : ''}`}
                        onClick={() => handleTagChange('draft')}
                    >
                        Draft
                    </button>
                    <button
                        className={`button ${selectedTag === 'spam' ? 'active' : ''}`}
                        onClick={() => handleTagChange('spam')}
                    >
                        Spam
                    </button>
                    <button
                        className={`button ${selectedTag === 'trash' ? 'active' : ''}`}
                        onClick={() => handleTagChange('trash')}
                    >
                        Trash
                    </button>
                    <button
                        className={`button ${selectedTag === 'all' ? 'active' : ''}`}
                        onClick={() => handleTagChange('all')}
                    >
                        View All
                    </button>
                </div>
            </div>

            {/* Mailbox content */}
            <div className="mail-content">
                {filteredMails.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    filteredMails.map((mail) => (
                        <div key={mail.id} className="mail-item">
                            <div
                                className="mail-subject"
                                onClick={() => toggleMail(mail.id)}
                            >
                                <h4>{mail.subject}</h4>
                                <span
                                    className={`arrow ${expandedMailId === mail.id ? 'up' : 'down'
                                        }`}
                                >
                                    &#9660;
                                </span>
                            </div>
                            {expandedMailId === mail.id && (
                                <div className="mail-body">
                                    <p>{mail.body}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Mailbox;