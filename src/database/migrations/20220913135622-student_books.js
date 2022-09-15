module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('student_books', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'books', key: 'id' },
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      delivery_prediction: {
        type: Sequelize.DATEONLY
      },
      return_date: {
        type: Sequelize.DATEONLY
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('student_books');
  }
};