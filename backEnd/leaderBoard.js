const { leaderBoard } = require('./models');
const { Sequelize } = require('sequelize');

function showBoard() {
  leaderBoard.findAll({
    order: Sequelize.literal('score DESC'),
    attributes: ['id', 'user_name', 'score'],
  });
}
function addUser(user_name, score) {
  leaderBoard.create(
    { user_name: user_name, score: score },
    { fields: ['user_name', 'score'] }
  );
}

module.exports = { showBoard, addUser };
