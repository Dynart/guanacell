const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
       const todo = new Todo(req.body)
  try {
    const newTodo = await todo.save();
    console.log('Tarea creada:', newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!todo)
      return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo)
      return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({message: 'Producto eliminado'})
  } catch (err) {
    res.status(500).json({ message: err.message });
  
  }
};