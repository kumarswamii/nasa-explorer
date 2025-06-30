const axios = require('axios');

class NASAService {
  constructor() {
    this.baseURL = 'https://api.nasa.gov';
    this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';

    // Create axios instance with default config
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      params: {
        api_key: this.apiKey
      }
    });
  }

  // Get Astronomy Picture of the Day
  async getAPOD(date = null) {
    try {
      const params = {};
      if (date) {
        params.date = date;
      }

      const response = await this.client.get('/planetary/apod', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('APOD API Error:', error.message);
      return {
        success: false,
        error: 'Failed to fetch Astronomy Picture of the Day',
        details: error.response?.data || error.message
      };
    }
  }

  // Get Mars Rover Photos
  async getMarsRoverPhotos(rover = 'curiosity', sol = 1000, camera = null) {
    try {
      const params = { sol };
      if (camera) {
        params.camera = camera;
      }

      const response = await this.client.get(`/mars-photos/api/v1/rovers/${rover}/photos`, { params });
      return {
        success: true,
        data: {
          photos: response.data.photos.slice(0, 12), // Limit to 12 photos
          rover: rover,
          sol: sol,
          total: response.data.photos.length
        }
      };
    } catch (error) {
      console.error('Mars Rover API Error:', error.message);
      return {
        success: false,
        error: 'Failed to fetch Mars Rover photos',
        details: error.response?.data || error.message
      };
    }
  }

  // Get Near Earth Objects
  async getNearEarthObjects(startDate, endDate) {
    try {
      const params = {
        start_date: startDate,
        end_date: endDate
      };

      const response = await this.client.get('/neo/rest/v1/feed', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('NEO API Error:', error.message);
      return {
        success: false,
        error: 'Failed to fetch Near Earth Objects',
        details: error.response?.data || error.message
      };
    }
  }

  // Get Earth Imagery
  async getEarthImagery(lat, lon, date, dim = 0.12) {
    try {
      const params = {
        lat,
        lon,
        date,
        dim
      };

      const response = await this.client.get('/planetary/earth/imagery', { params });
      return {
        success: true,
        data: {
          url: response.request.responseURL,
          coordinates: { lat, lon },
          date,
          dimension: dim
        }
      };
    } catch (error) {
      console.error('Earth Imagery API Error:', error.message);
      return {
        success: false,
        error: 'Failed to fetch Earth imagery',
        details: error.response?.data || error.message
      };
    }
  }

  // Get available rovers and their status
  async getRoversInfo() {
    try {
      const response = await this.client.get('/mars-photos/api/v1/rovers');
      return {
        success: true,
        data: response.data.rovers
      };
    } catch (error) {
      console.error('Rovers Info API Error:', error.message);
      return {
        success: false,
        error: 'Failed to fetch rovers information',
        details: error.response?.data || error.message
      };
    }
  }
}

module.exports = new NASAService();
