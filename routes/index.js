var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/',userController.suggestMovies);

module.exports = router;
