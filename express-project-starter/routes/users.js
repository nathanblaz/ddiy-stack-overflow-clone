var express = require('express');
var router = express.Router();
const {User} = require('../db/models');
const {check, validationResult} = require('express-validator')
const {asyncHandler, csrfProtection} = require('./utils');
const bcrypt = require('bcryptjs');

const userValidators = [
  //TODO Need to set up user validators.
]

router.get('/register', csrfProtection, (req, res, next) => {
  const user = User.build();
  res.render('user-register', {title: 'User Register', csrfToken: req.csrfToken(), user});
});

router.post('/register', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  const {name, email, bio, password, avatar} = req.body;
  const user = User.build({name, email, bio, avatar});
  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()){
    //TODO hash password.
  }
}));

module.exports = router;
