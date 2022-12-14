const { Model, DataTypes } = require('sequelize');

class Book extends Model {
    static init(sequelize) {
        super.init({
            name: { type: DataTypes.STRING },
            synopsis: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            publish_date: {
                type: DataTypes.DATEONLY,
                defaultValue: '',
            },
            book_cover_id: {
                type: DataTypes.INTEGER
            }
        }, {
            sequelize,
            paranoid: true,
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
        this.belongsTo(models.Publisher, { foreignKey: 'publisher_id', as: 'publisher' });
        this.belongsTo(models.Author, { foreignKey: 'author_id', as: 'author' });
        this.belongsToMany(models.Student, { foreignKey: 'book_id', through: 'student_books', as: 'students' });
        this.hasMany(models.BookCover, { foreignKey: 'book_id', as: 'book_covers' });
    }
}

module.exports = Book;