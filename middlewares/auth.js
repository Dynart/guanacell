const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
    req.user = { userId: user._id, role: user.role }; // Incluir el rol en req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};