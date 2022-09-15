module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'books', // table name
        'book_cover_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // // logic for reverting the changes
    // return Promise.all([
    //   queryInterface.removeColumn('Users', 'linkedin'),
    //   queryInterface.removeColumn('Users', 'twitter'),
    //   queryInterface.removeColumn('Users', 'bio'),
    // ]);
  },
};