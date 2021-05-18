'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 139,
        user_name: 'lior',
        score: 50,
        created_at: '2021-05-02 12:04:52',
        updated_at: '2021-05-02 13:34:14',
        password:
          '$2b$10$gGTlkwRcmQvkKzrtfATQEuONGcOLXoF4g/AUTXqIdEhGCDd.i5vYu',
      },
      {
        id: 140,
        user_name: 'shira',
        score: 50,
        created_at: '2021-05-02 13:53:46',
        updated_at: '2021-05-04 11:36:52',
        password:
          '$2b$10$u8lNntKkhqAo6t0NaPUfVeyHpZNpDFH/BS0evfrm9ygOExiVvXsUe',
      },
      {
        id: 141,
        user_name: 'noa',
        score: 120,
        created_at: '2021-05-07 20:13:41',
        updated_at: '2021-05-07 21:59:36',
        password:
          '$2b$10$LXr74fAx.aoAvj/Q6NQ6KurI0gG1.GaNkHj5cJMfZrSNH8HatMI2.',
      },
      {
        id: 142,
        user_name: 'newe',
        score: null,
        created_at: '2021-05-07 21:33:35',
        updated_at: '2021-05-07 21:33:35',
        password:
          '$2b$10$kCckShD.Ly1AnNhgShI6P.cOl8lv/6SetW4nIz/dbEeNE4f7Sq8Nu',
      },
      {
        id: 143,
        user_name: 'daniel',
        score: 0,
        created_at: '2021-05-17 18:59:44',
        updated_at: '2021-05-18 19:09:21',
        password:
          '$2b$10$7qH70sgdc.FK5lIocwAezet/QMUNXwi4zmdoFWhZsR/QE3wIJTVtS',
      },
      {
        id: 144,
        user_name: 'shir',
        score: null,
        created_at: '2021-05-18 14:39:14',
        updated_at: '2021-05-18 14:39:14',
        password:
          '$2b$10$whv.5swdJLrtUgzW5fyRBOasY5Ww/vYevNHSJJZ9WxqQuwDzt4uqm',
      },
      {
        id: 145,
        user_name: 'sfsf',
        score: null,
        created_at: '2021-05-18 14:49:54',
        updated_at: '2021-05-18 14:49:54',
        password:
          '$2b$10$v4J.52cJt82ipDuLEv2qlev7nKV9IEBbnfWoNttnwQhX6KVblt7bS',
      },
      {
        id: 146,
        user_name: 'sara',
        score: null,
        created_at: '2021-05-18 15:05:39',
        updated_at: '2021-05-18 15:05:39',
        password:
          '$2b$10$wc5sNGecziv587TwILwDfuIKF/ngXC4OYl91kmlat8V2JOgRKqrau',
      },
      {
        id: 147,
        user_name: 'hhh',
        score: null,
        created_at: '2021-05-18 15:14:12',
        updated_at: '2021-05-18 15:14:12',
        password:
          '$2b$10$q7BD/bEzuvGLQlV/lfPJR.BJI.DYy810mflSNv8RRAdVj0/./BqFa',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
