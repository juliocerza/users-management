const knex = require("knex");
const User = require("../models/User");
class UserController {
  async index(req, res) {
    let users = await User.findAll();
    res.json(users);
  }

  async findUser(req, res) {
    let id = req.params.id;
    let user = await User.findById(id);
    if (user == undefined) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(user);
    }
  }

  async create(req, res) {
    let { name, email, password } = req.body;
    if (email == undefined) {
      res.status(400).send("The e-mail is invalid!");
      return;
    }
    const emailExists = await User.findEmail(email);
    if (emailExists) {
      res.status(406).send("The email is already registered");
      return;
    }
    await User.create(name, email, password);
    res.status(201).send("OK");
  }

  async edit(req, res) {
    let { id, name, email, role } = req.body;
    let result = await User.update(id, name, email, role);
    if (result != undefined) {
      if (result.status) {
        res.send("All right");
      } else {
        res.status(406).send(result.err);
      }
    } else {
      res.status(406).send("An error has been ocourried");
    }
  }

  async remove(req, res) {
    let id = req.params.id;
    let result = await User.delete(id);
    if (result.status) {
      res.status(200).send("User deleted!");
    } else {
      res.status(406).send(result.err);
    }
  }
}

module.exports = new UserController();
