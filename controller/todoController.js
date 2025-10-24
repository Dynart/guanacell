const Todo = require('../models/Todo');
const User = require('../models/User');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
      .populate('createdBy', 'username')
      .populate('assignedTo', 'username')
      .sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.completedTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true })
      .populate('createdBy', 'username')
      .populate('assignedTo', 'username')
      .sort({ updatedAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      createdBy: req.user.id, // Usar id del usuario autenticado
      assignedTo: req.body.assignedTo || null,
      completed: req.body.completed || false
    });
    const newTodo = await todo.save();
    const populatedTodo = await Todo.findById(newTodo._id)
      .populate('createdBy', 'username')
      .populate('assignedTo', 'username');
    res.status(201).json(populatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    todo.assignedTo = req.body.assignedTo !== undefined ? req.body.assignedTo : todo.assignedTo;
    const updatedTodo = await todo.save();
    const populatedTodo = await Todo.findById(updatedTodo._id)
      .populate('createdBy', 'username')
      .populate('assignedTo', 'username');
    res.json(populatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username _id');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};