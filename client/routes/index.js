import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Test Cookies' });
});

export default router;
