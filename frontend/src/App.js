import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Simple Loading Component
const Loading = () => (
  <div className="loading">
    <div className="spinner"></div>
    <p>Loading space data...</p>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="error">
    <h3>Oops! Something went wrong</h3>
    <p>{message}</p>
    <button onClick={onRetry} className="retry-btn">Try Again</button>
  </div>
);

// APOD Component - Astronomy Picture of the Day
const APOD = ({ data }) => (
  <div className="apod-section">
    <h2>🌌 Astronomy Picture of the Day</h2>
    <div className="apod-content">
      <div className="apod-image">
        {data.media_type === 'image' ? (
          <img src={data.url} alt={data.title} />
        ) : (
          <iframe 
            src={data.url} 
            title={data.title}
            allowFullScreen
          />
        )}
      </div>
      <div className="apod-info">
        <h3>{data.title}</h3>
        <p className="date">📅 {data.date}</p>
        <p className="explanation">{data.explanation}</p>
        {data.copyright && (
          <p className="copyright">📸 Credit: {data.copyright}</p>
        )}
      </div>
    </div>
  </div>
);

// Mars Rover Photos Component
const MarsPhotos = ({ photos, rover, sol }) => (
  <div className="mars-section">
    <h2>🔴 Mars Rover: {rover.toUpperCase()}</h2>
    <p className="sol-info">Sol {sol} (Martian Day {sol})</p>
    <div className="photos-grid">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-card">
          <img src={photo.img_src} alt={`Mars ${photo.camera.full_name}`} />
          <div className="photo-info">
            <p><strong>Camera:</strong> {photo.camera.full_name}</p>
            <p><strong>Date:</strong> {photo.earth_date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Controls Component for user interaction
const Controls = ({ onFetchAPOD, onFetchMarsPhotos, selectedDate, setSelectedDate }) => {
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [selectedSol, setSelectedSol] = useState(1000);

  const rovers = ['curiosity', 'perseverance'];

  return (
    <div className="controls">
      <h2>🚀 Space Data Controls</h2>

      <div className="control-group">
        <h3>Astronomy Picture of the Day</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        <button onClick={() => onFetchAPOD(selectedDate)} className="fetch-btn">
          Get APOD
        </button>
      </div>

      <div className="control-group">
        <h3>Mars Rover Photos</h3>
        <select 
          value={selectedRover} 
          onChange={(e) => setSelectedRover(e.target.value)}
        >
          {rovers.map(rover => (
            <option key={rover} value={rover}>
              {rover.charAt(0).toUpperCase() + rover.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Sol (Martian day)"
          value={selectedSol}
          onChange={(e) => setSelectedSol(e.target.value)}
          min="1"
          max="3000"
        />
        <button 
          onClick={() => onFetchMarsPhotos(selectedRover, selectedSol)} 
          className="fetch-btn"
        >
          Get Mars Photos
        </button>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  // State management using React hooks
  const [apodData, setApodData] = useState(null);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [marsRover, setMarsRover] = useState('');
  const [marsSol, setMarsSol] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetch APOD data
  const fetchAPOD = async (date = null) => {
    setLoading(true);
    setError('');

    try {
      const url = date ? `/api/apod?date=${date}` : '/api/apod';
      const response = await axios.get(url);
      setApodData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch APOD data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Mars Rover Photos
  const fetchMarsPhotos = async (rover = 'curiosity', sol = 1000) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`/api/mars-photos?rover=${rover}&sol=${sol}`);
      setMarsPhotos(response.data.photos);
      setMarsRover(rover);
      setMarsSol(sol);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch Mars photos');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data when component mounts
  useEffect(() => {
    fetchAPOD();
  }, []); // Empty dependency array means this runs once on mount

  // Retry function for error handling
  const handleRetry = () => {
    setError('');
    fetchAPOD();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌌 NASA Space Data Explorer</h1>
        <p>Explore the universe through NASA's amazing APIs</p>
      </header>

      <main className="App-main">
        <Controls
          onFetchAPOD={fetchAPOD}
          onFetchMarsPhotos={fetchMarsPhotos}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {loading && <Loading />}

        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && (
          <>
            {apodData && <APOD data={apodData} />}
            {marsPhotos.length > 0 && (
              <MarsPhotos 
                photos={marsPhotos} 
                rover={marsRover} 
                sol={marsSol} 
              />
            )}
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>Data provided by NASA Open APIs | Built with React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;
