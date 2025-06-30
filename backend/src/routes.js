const express = require('express');
const router = express.Router();
const nasaService = require('./nasaService');

// Get Astronomy Picture of the Day
router.get('/apod', async (req, res) => {
  try {
    const { date } = req.query;
    const result = await nasaService.getAPOD(date);

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error, details: result.details });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Mars Rover Photos
router.get('/mars-photos', async (req, res) => {
  try {
    const { rover = 'curiosity', sol = 1000, camera } = req.query;
    const result = await nasaService.getMarsRoverPhotos(rover, sol, camera);

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error, details: result.details });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Near Earth Objects
router.get('/neo', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'start_date and end_date are required' });
    }

    const result = await nasaService.getNearEarthObjects(start_date, end_date);

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error, details: result.details });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Earth Imagery
router.get('/earth-imagery', async (req, res) => {
  try {
    const { lat, lon, date, dim } = req.query;

    if (!lat || !lon || !date) {
      return res.status(400).json({ error: 'lat, lon, and date are required' });
    }

    const result = await nasaService.getEarthImagery(lat, lon, date, dim);

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error, details: result.details });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Rovers Information
router.get('/rovers', async (req, res) => {
  try {
    const result = await nasaService.getRoversInfo();

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(400).json({ error: result.error, details: result.details });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
