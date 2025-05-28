module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Específico para dev
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};