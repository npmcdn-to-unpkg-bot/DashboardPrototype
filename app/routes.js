var express = require('express');
var config = require(__dirname + "/../config.js");
var auth = require(__dirname + "/../data/auth.js");
var tc = require(__dirname + "/../data/tc.js");
var overview = require(__dirname + "/../data/overview.js");
var router;

router = express.Router();

router.get('./overview', function(req, res, next) {
  overview.getTobBilled(function(err, accounts) {
    if(err) {
      next(err);

      return;
    }

    res.status(200).json({"data": accounts});
  });
});
