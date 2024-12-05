const router = require('express').Router();
const categoryController = require('./controller')
const { police_check } = require('../middleware/index')

router.get('/categories', categoryController.index);

router.post('/categories',

    categoryController.store);

router.put('/categories/:id',
    police_check('update', 'Category'),
    categoryController.update);

router.delete('/categories/:id',
    police_check('delete', 'Category'),
    categoryController.destroy);

module.exports = router;