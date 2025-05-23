const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const imageController = require('../controllers/imageController');

// Endpoint untuk menyimpan foto dari frontend
router.post('/photos', photoController.savePhoto);

// Endpoint untuk menggabungkan foto ke dalam template
router.post('/combine', imageController.combineImages);

// Endpoint untuk mendapatkan daftar template yang tersedia
router.get('/templates', imageController.getTemplates);

module.exports = router;