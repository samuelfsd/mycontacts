const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return res.status(400).json({ error: 'E-mail already exists' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    return res.status(201).json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: 'user not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const contactEmail = await ContactsRepository.findByEmail(email);
    if (contactEmail && contactEmail.id !== id) {
      return res.status(400).json({ error: 'E-mail already exists' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    return res.status(200).json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    await ContactsRepository.delete(id);

    return res.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
