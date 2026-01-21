import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace 
      ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
      : `${window.location.protocol}//${window.location.hostname}:8000/api/leaderboard/`;
    
    console.log('Leaderboard API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading leaderboard...
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark">
          <h2 className="mb-0">🏆 Leaderboard</h2>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <p className="text-muted">No leaderboard data found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard
                    .sort((a, b) => b.points - a.points)
                    .map((entry, index) => (
                      <tr key={entry.id || index}>
                        <th scope="row">
                          {index === 0 && <span className="badge bg-warning text-dark fs-5">🥇 1</span>}
                          {index === 1 && <span className="badge bg-secondary fs-5">🥈 2</span>}
                          {index === 2 && <span className="badge bg-danger fs-5">🥉 3</span>}
                          {index > 2 && <span className="badge bg-light text-dark">{index + 1}</span>}
                        </th>
                        <td><strong>{entry.team}</strong></td>
                        <td><span className="badge bg-primary fs-6">{entry.points} pts</span></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
