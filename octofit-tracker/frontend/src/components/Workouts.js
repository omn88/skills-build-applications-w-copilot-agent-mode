import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace 
      ? `https://${codespace}-8000.app.github.dev/api/workouts/`
      : `${window.location.protocol}//${window.location.hostname}:8000/api/workouts/`;
    
    console.log('Workouts API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading workouts...
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
        <div className="card-header bg-danger text-white">
          <h2 className="mb-0">💪 Workouts</h2>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <p className="text-muted">No workouts found.</p>
          ) : (
            <div className="row">
              {workouts.map((workout, index) => (
                <div key={workout.id || index} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm border-danger">
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <span className="fs-1">⚡</span>
                      </div>
                      <h5 className="card-title text-uppercase"><strong>{workout.name}</strong></h5>
                      <hr />
                      <div className="mt-3">
                        <span className={`badge fs-6 ${
                          workout.difficulty === 'easy' ? 'bg-success' : 
                          workout.difficulty === 'medium' ? 'bg-warning text-dark' : 
                          'bg-danger'
                        }`}>
                          {workout.difficulty.toUpperCase()}
                        </span>
                      </div>
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

export default Workouts;
