const db = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  create: function (req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    db.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.findById({ _id: req.session.userId }, req.body)
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  login: function (req, res) {
    db.find({ email: req.body.email })
      .then((dbModel) => {
        if (!dbModel) {
          res.status(400);
          return res.status(400).send({ message: "Email is incorrect." });
        }
        if (!bcrypt.compareSync(req.body.password, dbModel[0].password)) {
          return res.status(400).send({ message: "Password is invalid." });
        }
        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userId = dbModel[0]._id;
          res.status(200).json({ user: req.body.email });
        });
      })  
      .catch((err) => res.status(500).json(err));
  },
  logout: function (req, res) {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
};
