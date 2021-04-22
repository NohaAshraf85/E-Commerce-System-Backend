const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    // find all categories
    const categoriesData = await Category.findAll({
      // be sure to include its associated Products
      include: [{model: Product, as: 'category_product'}]
    });

    if (!categoriesData) {
      res.status(404).json({message: "Categories not found"});
      return;
    }

    res.status(200).json(categoriesData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{model: Product, as: 'category_product'}]
    });

    if (!categoriesData) {
      res.status(404).json({message: "Categories not found"});
      return;
    }

    res.status(200).json(categoriesData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoriesData = await Category.update(
      {category_name: req.body.category_name},
      {returning: true, where: {id: req.params.id}}
    )
    res.status(200).json(categoriesData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoriesData) {
      res.status(404).json({message: "No Categories found with this id"});
      return;
    }
    res.status(200).json(categoriesData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
