import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              <span className="fs-4">🏋️ OctoFit Tracker</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👥 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">⚡ Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">🏃 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <div className="jumbotron bg-light p-5 rounded shadow">
                <h1 className="display-4 fw-bold text-primary">Welcome to OctoFit Tracker! 🏋️</h1>
                <p className="lead mt-4">Track your fitness activities, compete with teams, and reach your goals!</p>
                <hr className="my-4" />
                <p className="mb-4">Start your fitness journey today by exploring our features:</p>
                <div className="row text-center">
                  <div className="col-md-4 mb-3">
                    <Link to="/users" className="btn btn-success btn-lg w-100">👥 View Users</Link>
                  </div>
                  <div className="col-md-4 mb-3">
                    <Link to="/teams" className="btn btn-info btn-lg w-100">⚡ View Teams</Link>
                  </div>
                  <div className="col-md-4 mb-3">
                    <Link to="/leaderboard" className="btn btn-warning btn-lg w-100">🏆 Leaderboard</Link>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
