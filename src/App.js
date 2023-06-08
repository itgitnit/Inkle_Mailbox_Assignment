import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Mailbox from './components/Mailbox/Mailbox';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Mailbox />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
