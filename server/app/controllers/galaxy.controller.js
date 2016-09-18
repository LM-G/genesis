var express = require('express');
var router = express.Router();
var path = require('path');

var galaxyService = require(path.join(__base, 'app/services/galaxy.service'));
var authService = require(path.join(__base, 'app/services/auth.service'));

router.get('/', getSystems);
router.post('/generate', authService.checkRoleIsAdmin, generate);

module.exports = router;

/* fonction internes */
function getSystems(req, res){
  galaxyService
    .getSystems()
    .then(function(systems) {
      // authentication successful
      res.json(systems);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

/**
 * Starts a galaxy generation, the process
 */
function generate(req, res) {
  galaxyService
    .generate(req.body)
    .then(function() {
      res.json({
        message: 'Coming soon',
      });
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}
