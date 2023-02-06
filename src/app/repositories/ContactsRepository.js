const { v4 } = require('uuid');

const db = require('../../database');

let mockContacts = [
  {
    id: v4(),
    name: 'Samuel',
    email: 'samuel@gmail.com',
    phone: '123456789',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Savio',
    email: 'savio@gmail.com',
    phone: '987654321',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(mockContacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(
        mockContacts.find((contact) => contact.id === id),
      );
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(
        mockContacts.find((contact) => contact.email === email),
      );
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      mockContacts = mockContacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name,email,phone,category_id)
      VALUES($1,$2,$3,$4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      mockContacts = mockContacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
