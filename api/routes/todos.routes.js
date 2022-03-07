const express = require('express');
const router = express.Router();

const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todos.controller');

router.get('/', getAllTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = { routerTodo: router };
