const { Model, DataTypes } = require('sequelize');

class Author extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            biography: {
                type: DataTypes.STRING,
                defaultValue: '',
            }
        }, {
            sequelize,
            tableName: 'authors',
        })
    }
};

module.exports = Author;