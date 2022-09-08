const { Model, DataTypes } = require('sequelize');

class StudentBooks extends Model {
    static init(sequelize) {
        super.init(
            {}, {
            sequelize,
            paranoid: true,
        })
    }

    static associate(models) {
        this.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
        this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    }
}

module.exports = StudentBooks;