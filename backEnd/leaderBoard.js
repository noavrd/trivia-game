const { user } = require('./models');
const { Sequelize } = require('sequelize');

async function showBoard() {
  try {
    console.log(1);
    let allUsers = await user.findAll({
      order: Sequelize.literal('score DESC'),
      attributes: ['id', 'user_name', 'score'],
    });
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}
async function addUser(user_name, score) {
  try {
    const board = await user.create(
      { user_name: user_name, score: score },
      { fields: ['user_name', 'score'] }
    );
    return board;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { showBoard, addUser };
