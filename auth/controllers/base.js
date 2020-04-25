const $u = require("../requesters/database.user");
const joi = require("joi");
const hashSecret = "TR@D3EX9L0R3R";
const jwt = require("jsonwebtoken");
const Pub = require("../publishers/auth.publisher");
const Verify = require("./verification");
const mysql = require("mysql");
var request = require("request");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
var crypto = require("crypto");

module.exports = class baseController {
  static coordinateSchema() {
    return joi.object().keys({
      email: joi.string().required(),
      latitude: joi.string().required(),
      logitude: joi.string().required(),
    });
  }

  static storeCoordinates(req, res) {
    $u.User.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        $set: {
          coordinates: {
            latitude: req.body.latitude,
            logitude: req.body.logitude,
          },
        },
      }
    )
      .then(
        (data) => {
          res.status(200).json(data);
        },
        (err) => {
          res.status(400).json(err.toString());
        }
      )
      .catch((err) => res.status(500).json(err.toString()));
  }

  static myinfo(req, res) {
    let myposts,
      myganged = 0,
      mygang = 0;
    Promise.all([
      $u.Discover.find({
        user: req.params.user,
      }),
    ])
      .then(([post]) => {
        myposts = post.length;

        res.json({ posts: myposts });
      })
      .catch((err) => {
        res.status(500).json(err.toString());
      });
  }

  static updateEmail(req, res) {
    return $u.User.updateEmail()
      .then(
        (users) => {
          res.json(users);
        },
        (error) => {
          res.json(error);
          console.log(error);
        }
      )
      .catch((err) => {
        res.status(500).json(err.toString());
      });
  }

  static generateAndReplaceWhiteSpacesWithCharacter(
    name,
    numberMax,
    character
  ) {
    var currentname = name;
    var d = new Date();
    var ran = d.getTime().toString() + Math.floor(Math.random() * 1000 + 1);
    //just to make sure things goes as plan
    if (ran.length < numberMax)
      return this.generateAndReplaceWhiteSpacesWithCharacter(currentname);

    var ranNum = Math.floor(Math.random() * 1000 + 1) + "" + ran.toString();
    var n = ranNum.slice(0, numberMax);
    var newName = name.toLowerCase().replace(/\s/g, character) + n;
    return newName;
  }

  static prepToken(id) {
    return jwt.sign({ login: id }, hashSecret);
  }

  static get loginSchema() {
    return joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().min(6).max(32).required(),
      token: joi.string().optional(),
      //deviceId : joi.string().optional(),
      location: joi.string().allow("", null),
    });
  }

  static get staffLoginSchema() {
    return joi.object().keys({
      email: joi.string().required(),
      password: joi.string(),
      token: joi.string().optional(),
      //deviceId : joi.string().optional(),
      location: joi.string().allow("", null),
    });
  }

  static get logoutSchema() {
    return joi.object().keys({
      id: joi.number().required(),
    });
  }

  static destroy(user, logout) {
    return $u.User.updateUser(user, logout);
  }

  static logoutAcc(req, res) {
    baseController
      .destroy(req.body.id, { token: null })
      .then(
        (user) => {
          res.json(Object.assign(user, { message: true }));
        },
        (err) => {
          res.json(Object.assign(err, { message: false }));
        }
      )
      .catch((err) =>
        res.json(Object.assign(err.toString(), { message: false }))
      );
  }

  static doLogin(req, res) {
    let allowed = ["user", "admin", "marketer"];
    return $u.User.login(
      Object.assign(
        {
          headers: req.headers,
          as:
            req.query.as && allowed.includes(req.query.as)
              ? req.query.as
              : "user",
          ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        },
        req.body
      )
    );
  }

  static login(req, res) {
    baseController
      .doLogin(req, res)
      .then(
        ([login, user]) => {
          // console.log("From dologin");
          console.log(user.id);
          baseController
            .attachToken(user, login)
            .then(
              (user) => {
                res.json(
                  Object.assign(
                    user,
                    { token: baseController.prepToken(user.id) },
                    { message: true }
                  )
                );
              },
              (err) => {
                res.json(
                  Object.assign(
                    err,
                    { token: baseController.prepToken(user.id) },
                    { message: true }
                  )
                );
              }
            )
            .catch((err) =>
              res.json(
                Object.assign(
                  err.toString(),
                  { token: baseController.prepToken(user.id) },
                  { message: true }
                )
              )
            );
        },
        (err) => res.status(400).json(err)
      )
      .catch((err) => res.status(500).json(err.toString()));
  }

  static attachToken(user, login) {
    delete user.password;
    const token = { token: baseController.prepToken(user.id) };
    return $u.User.updateUser(user.id, token);
  }

  static get signupSchema() {
    return joi.object().keys({
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      email: joi.string().email().lowercase().required(),
      phone: joi.string().required(),
      pictureURL: joi.string().uri().optional(),
      address: joi.string().optional(),
      password: joi.string().min(6).max(32).required(),
      rcountry: joi.string().uppercase().required(),
      token: joi.string().optional(),
      deviceId: joi.string().optional(),
    });
  }

  static sendMail(to, from, subject, text, html) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };
    sgMail.send(msg);
  }

  static isIdUnique(wallet) {
    return db.count({ where: { walletid: wallet } }).then((count) => {
      if (count != 0) {
        return false;
      }
      return true;
    });
  }

  static createWallet() {
    const id = crypto.randomBytes(20).toString("hex");
    this.isIdUnique(id).then((isUnique) => {
      if (isUnique) {
        return id;
      }
      this.createWallet();
    });
  }

  static signup(req, res) {
    if (req.query.q != undefined || req.query.q != null) {
      var referer = req.query.q;
    } else {
      var referer = null;
    }
    $u.User.signup(
      Object.assign(req.body, {
        headers: req.headers,
        ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        status: Verify.generateCode(),
      })
    )
      .then(([user, login]) => {
        let apptype = "Tradexplorer";
        try {
          // request.get(
          //   "http://142.93.207.91//tdxmailer/signup.php?" +
          //     "email=" +
          //     user.email +
          //     "&id=" +
          //     user.id +
          //     "&fullname=" +
          //     user.firstname +
          //     " " +
          //     user.lastname +
          //     "&token=" +
          //     user.status +
          //     "&from=" +
          //     apptype,
          //   function (error, response, body) {
          //     if (error) console.log(error);
          //     if (response) console.log("Email Sent to " + user.email);
          //   }
          // );
          const url = `http://localhost:1000/auth/verification/${user.email}/${user.status}/${apptype}`;
          const text = `Please click on this link to confirm your email: <a href="${url}">${url}</a>`;
          const html = `Please click on this link to confirm your email: <a href="${url}">${url}</a>`;
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: user.email,
            from: "test@example.com",
            subject: "Sending with Twilio SendGrid is Fun",
            text: text,
            html: html,
          };
          //ES6
          sgMail.send(msg).then(
            () => {},
            (error) => {
              console.error(error);

              if (error.response) {
                console.error(error.response.body);
              }
            }
          );
          // this.sendMail(
          //   user.email,
          //   "No-reply@tdx.com",
          //   "Email Verification",
          //   text,
          //   html
          // );
          res.json(baseController.attachToken(user, login));
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getuser(req, res) {
    $u.User.fetchOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err.toString());
      });
  }

  static getreferee(req, res) {
    $u.User.getrefere({ userId: req.params.referer })
      .then(
        (referee) => {
          res
            .status(200)
            .json(Object.assign({ param: req.param.referer }, referee));
        },
        (err) => {
          res.status(400).json(err);
        }
      )
      .catch((err) => {
        res.status(500).json(err.toString());
      });
  }

  static fetchuser(req, res) {
    $u.User.getOne({
      username: req.params.username,
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err.toString());
      });
  }

  static myposts(req, res) {
    $u.Discover.get(
      Object.assign(
        {
          login: req.params.user,
          user: req.params.user,
          limit: req.query.limit,
          skip: req.query.offset,
        },
        "tag" in req.query && {
          tag: decodeURIComponent(req.query.tag),
        }
      )
    )
      .then(
        (data) => res.json(data),
        (err) => res.status(400).json(err)
      )
      .catch((err) => res.status(500).json(err));
  }
};
