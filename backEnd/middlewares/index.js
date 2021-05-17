const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAccessToken = (req, res, next) => {
  let token = req.headers.token;
  if (!token) return res.status(403).json({ message: 'Access token required' });
token= token.replace("bearer ","" )
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Access token' });
    }
    req.user = decoded;
    next();
  });
};
module.exports = { checkAccessToken };
