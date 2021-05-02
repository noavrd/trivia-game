const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAccessToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) return res.status(401).json({ message: 'Access token required' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Access token' });
    }
    req.user = decoded;
    next();
  });
};
module.exports = { checkAccessToken };
