var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('lodash');

var userService = require(path.join(__base, 'app/services/user.service'));

router.get('/', getUser);

module.exports = router;

/* fonction internes */
function getUser(req, res) {
  res.json(_.pick(req.user, ['id', 'username', 'email', 'role']));
}
