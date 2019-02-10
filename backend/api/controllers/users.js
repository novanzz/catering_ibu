const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

module.exports = {
  async user_post_signup(req, res, next) {
    const { email } = req.body;
    const checkEmail = await User.findOne({ email });

    try {
      if (checkEmail) {
        return res.status(403).send({
          message: "Mail is already"
        });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.send({
              error: err
            });
          } else {
            const user = await new User({
              _id: mongoose.Types.ObjectId(),
              email: email,
              password: hash
            });
            user.save()
              .then(result => {
                console.log(result);
                return res.status(200).json({
                  message: "User Created"
                });
              })
              .catch(err => {
                console.log(err);
                res.send({
                  error: err
                });
              });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        error: err
      });
    }
  },

  async user_post_login(req, res, next) {
    console.log(req.body);
    const { email, password } = req.body;
    const users = await User.find({ email });

    try {
      if (users.length < 1) {
        return res.status(401).json({
          isValid: "false"
        });
      } else {
        bcrypt.compare(password, users[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              isValid: "false"
            });
          } else if (result) {
            const token = jwt.sign({
              email: users[0].email,
              user: users[0]._id
            },
              keys.jwtKeys,
              {
                expiresIn: "5h"
              });
            return res.status(200).json({
              isValid: "true",
              token: token,
            });
          } else {
            return res.status(401).json({
              isValid: "false"
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        error: err
      });
    }
  },

};