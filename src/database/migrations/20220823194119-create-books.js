'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publish_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      publisher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'publishers', key: 'id' },
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'authors', key: 'id' },
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
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('books');
  }
};
