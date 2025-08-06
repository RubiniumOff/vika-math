const { Router } = require('express');
const MathController = require('../controllers/MathController');
const router = Router();

router.get('/levels/arithmetic', MathController.arithmetic);

module.exports = router;