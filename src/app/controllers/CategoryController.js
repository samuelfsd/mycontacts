const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();

    return res.json(categories);
  }

  async show(req, res) {
    const { id } = req.body;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    return res.status(201).json(category);
  }

  async update(req, res) {
    const { id } = req.params;

    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const category = await CategoriesRepository.update(id, { name });

    return res.status(200).json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);

    return res.sendStatus(200);
  }
}

module.exports = new CategoryController();
