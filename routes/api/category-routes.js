const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get all categories
router.get('/', (req, res) => {
  Category.findAll()
  .then(dbCategoryData => {
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id 
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({  message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    id: req.params.id,
    category_name: req.body.category_name
  })
  .then(dbCategoryData => {
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req, {
    individualHooks: true,
    where: {
      id: req.params.id,
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      res.status(404).json({  message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({  message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
