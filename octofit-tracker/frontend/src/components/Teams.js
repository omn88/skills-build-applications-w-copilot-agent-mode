import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace 
      ? `https://${codespace}-8000.app.github.dev/api/teams/`
      : `${window.location.protocol}//${window.location.hostname}:8000/api/teams/`;
    
    console.log('Teams API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading teams...
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
      <div className="card shadow mb-4">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">⚡ Teams</h2>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <p className="text-muted">No teams found.</p>
          ) : (
            <div className="row">
              {teams.map((team, index) => (
                <div key={team.id || index} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm border-info">
                    <div className="card-header bg-info text-white">
                      <h5 className="card-title mb-0 text-uppercase"><strong>{team.name}</strong></h5>
                    </div>
                    <div className="card-body">
                      <h6 className="card-subtitle mb-3 text-muted">Team Members:</h6>
                      {team.members && team.members.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {team.members.map((member, idx) => (
                            <li key={idx} className="list-group-item">
                              👤 {member}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">No members</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
