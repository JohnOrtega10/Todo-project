//Utils
const { filterObj } = require('../utils/filterObj');
//Models
const { Todo } = require('../models/todo.model');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { status: 'active' } });
    res.status(200).json({
      status: 'Success',
      data: {
        todos
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({
        status: 'error',
        message: 'Must provide a valid content'
      });

      return;
    }

    const newTodo = await Todo.create({ content });

    res.status(201).json({
      status: 'success',
      data: {
        newTodo
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOne({ where: { id, status: 'active' } });
  if (!todo) {
    res.status(404).json({
      status: 'success',
      message: 'Could not update todo , invalid ID'
    });
    return;
  }

  const obj = req.body;
  const data = filterObj(obj, 'content');

  await todo.update({ ...data });

  res.status(204).json({ status: 'success' });
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id, status: 'active' } });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Could not delete todo, invalid ID'
      });
      return;
    }

    await todo.update({ status: 'delected' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
