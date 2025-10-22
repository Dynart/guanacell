const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');


router.get('/', auth, todoController.getTodos);
router.post('/', [auth], todoController.createTodo);
router.put('/:id', [auth, admin], todoController.updateTodo);
router.delete('/:id', [auth, admin], todoController.deleteTodo);

module.exports = router;