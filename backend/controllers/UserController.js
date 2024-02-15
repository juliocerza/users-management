require("dotenv").config({ path: "../.env" });
const knex = require("knex");
const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const privateKey = process.env.SECRET;

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
    if (email == undefined || email == "" || email == " ") {
      res.status(400).send("The e-mail is invalid!");
      return;
    }
    const emailExists = await User.findEmail(email);
    if (emailExists) {
      res.status(406).send("The email is already registered");
      return;
    }
    await User.create(name, email, password);
    res.status(201).send("User created");
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

  async recoverPassword(req, res) {
    let email = req.body.email;
    let result = await PasswordToken.create(email);
    if (result.status) {
      res.status(200).send("" + result.token);
    } else {
      res.status(406).send(result.err);
    }
  }

  async changePassword(req, res) {
    let token = req.body.token;
    let password = req.body.password;
    let isTokenValid = await PasswordToken.validate(token);
    if (isTokenValid.status) {
      await User.changePassword(
        password,
        isTokenValid.token.user_id,
        isTokenValid.token.token
      );
      res.status(200).send("The password was changed!");
    } else {
      res.status(406).send("Invalid token!!!");
    }
  }

  async login(req, res) {
    let { email, password } = req.body;
    let user = await User.findByEmail(email);
    if (user != undefined) {
      let result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign(
          { email: user.email, role: user.role },
          privateKey
        );
        res.status(200).json({ token: token });
      } else {
        res.status(406).send("Senha incorreta!");
      }
    } else {
      res.status(406).json({ status: false, err: "O usuário não existe" });
    }
  }
}

module.exports = new UserController();
