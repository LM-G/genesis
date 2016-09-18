var express = require('express');
var router = express.Router();

/* path = /test */

router.get('/', getTest);

module.exports = router;

function getTest(req, res) {
  res.json({
    message: 'Successfully accessed test api!',
    data: new Date()
  });
}