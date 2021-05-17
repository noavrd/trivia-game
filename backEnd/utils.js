require('dotenv').config();
const jwt = require('jsonwebtoken');

function createAccessToken(name) {
  const accessToken = jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10s',
  });
  return accessToken;
}
function createRefreshToken(name) {
  const refreshToken = jwt.sign({ name }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return refreshToken;
}
//send the refresh token to cookie
function sendRefreshToken(refreshToken, response) {
  response.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() * 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    // secure: true,
  });
}
module.exports = { createAccessToken, createRefreshToken, sendRefreshToken };
