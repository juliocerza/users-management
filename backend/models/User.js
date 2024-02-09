const knex = require("../database/connection");
const bcrypt = require("bcrypt");
class User {
  async;

  async findAll() {
    try {
      return await knex.select(["id", "name", "email", "role"]).table("users");
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findById(id) {
    try {
      let result = await knex
        .select(["id", "name", "email", "role"])
        .where({ id: id })
        .table("users");
      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async findEmail(email) {
    try {
      let result = await knex.select().from("users").where({ email: email });
      return result.length > 0;
    } catch (e) {
      console.log(e);
    }
  }

  async create(name, email, password) {
    try {
      const hash = await bcrypt.hash(password, 10);

      await knex
        .insert({ name, email, password: hash, role: 0 })
        .table("users");
    } catch (e) {
      console.log(e);
    }
  }

  async update(id, name, email, role) {
    const user = await this.findById(id);
    if (user != undefined) {
      let editUser = {};
      if (email != undefined) {
        if (email != user.email) {
          let result = await this.findEmail(email);
          if (!result) {
            editUser.email = email;
          } else {
            return { status: false, err: "The email is already registered!" };
          }
        }
      }

      if (name != undefined) {
        editUser.name = name;
      }

      if (role != undefined) {
        editUser.role = role;
      }

      try {
        await knex.update(editUser).where({ id: id }).table("users");
        return { status: true };
      } catch (e) {
        return { status: false, err: e };
      }
    } else {
      return { status: false, err: "The user don't exists!" };
    }
  }

  async delete(id) {
    let user = await this.findById(id);
    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users");
        return { status: true };
      } catch (e) {
        return { status: false, err: e };
      }
    } else {
      return { status: false, err: "The user don't exists!" };
    }
  }
}

module.exports = new User();
