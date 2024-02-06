class UserController {
  async create(req, res) {
    console.log(req.body.name);
    res.send("Criado");
  }
}

module.exports = new UserController();
