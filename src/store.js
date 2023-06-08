import { configureStore } from '@reduxjs/toolkit';

// initial state
const initialState = {
    searchQuery: '',
    expandedMailId: null,
    selectedTag: 'all',
    filteredMails: [],
};

// reducer function
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'SET_EXPANDED_MAIL_ID':
            return { ...state, expandedMailId: action.payload };
        case 'SET_SELECTED_TAG':
            return { ...state, selectedTag: action.payload };
        case 'SET_FILTERED_MAILS':
            return { ...state, filteredMails: action.payload };
        default:
            return state;
    }
};

// Store
const store = configureStore({
    reducer: rootReducer,
});

export default store;
