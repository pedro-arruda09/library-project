const { Model, DataTypes } = require('sequelize');

class Student extends Model {
    static init(sequelize) {
        super.init({
            name: { type: DataTypes.STRING },
            registration: {
                type: DataTypes.INTEGER,
                defaultValue: '',
            },
            birth_date: {
                type: DataTypes.DATEONLY,
                defaultValue: '',
            },
        }, {
            sequelize,
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
        // this.belongsToMany(models.Book, { foreignKey: 'student_id', through: 'student_books', as: 'books' });
    }
}

module.exports = Student;