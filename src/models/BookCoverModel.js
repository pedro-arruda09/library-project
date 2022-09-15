const { Model, DataTypes } = require('sequelize');

class BookCover extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            filename: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
        }, {
            sequelize,
            paranoid: true,
            tableName: 'book_covers'
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
        this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
    }
}

module.exports = BookCover;