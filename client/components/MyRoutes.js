import React from 'react';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import AdminView from './AdminView';

const MyRoutes = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route exact path="/" element={<AdminView />} />
        </Routes>
      </main>
    </Router>
  );
};

export default MyRoutes;
