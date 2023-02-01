class ContactController {
  index(req, res) {
    // listar todos os registros

    res.send('send from contact controller ');
  }

  show() {
    // obter UM registro
  }

  store() {
    // criar novo registro
  }

  update() {
    // editar um registro
  }

  delete() {
    // deletar um registro
  }
}

// Singleton
module.exports = new ContactController();
