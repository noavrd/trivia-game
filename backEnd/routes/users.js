require('dotenv').config();
const { Router, text } = require('express');
const { hashSync, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { USERS, addUser } = require('../leaderBoard');
const cookieParser = require('cookie-parser');

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require('../utils');
const users = Router();

users.post('/register', async (req, res, next) => {
  try {
    const { user_name, password } = req.body;

    //check if user exists
    const allUsers = await USERS();
    const checkUser = allUsers.find((user) => user_name === user.user_name);
    console.log(allUsers);
    //id user exist, send response
    if (checkUser) {
      return res.status(409).send('user already exists');
    }
    //id user doesnt exist, send the right response
    const hashedPassword = hashSync(password, 10);

    // add user to the Sql:
    await addUser(user_name, hashedPassword);
    // res.status(200).send('added a new user successfully');
    const accessToken = createAccessToken(user_name);
    const refreshToken = createRefreshToken(user_name);
    sendRefreshToken(refreshToken, res);
    res.json({ name: user_name, accessToken });
  } catch (err) {
    next(err);
  }
});

users.post('/login', async (req, res, next) => {
  const { user_name, password } = req.body;
  const allUsers = await USERS();
  const user = allUsers.find((entry) => entry.user_name === user_name);

  if (!user) {
    return res.status(404).send('cannot find user');
  }
  try {
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send('Password incorrect');
    }
    const accessToken = createAccessToken(user_name);
    const refreshToken = createRefreshToken(user_name);
    sendRefreshToken(refreshToken, res);
    res.json({ name: user_name, accessToken });
  } catch (err) {
    next(err);
  }
});

users.post('/logout', (req, res) => {
  sendRefreshToken('', res);
  res.send('user logout');
});
users.post('/refreshToken', cookieParser(), (req, res) => {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(403).send('refresh token is required');
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Invalid Refresh token' });
    }
    const newAccessToken = createAccessToken(decoded.name);
    res.json({ accessToken: newAccessToken, name: decoded.name });
  });
});
module.exports = users;
