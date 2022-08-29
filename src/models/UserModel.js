const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            password_hash: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
            },
        }, {
            sequelize,
            tableName: 'users',
        })

        this.addHook('beforeSave', async user => {
            user.password_hash = await bcryptjs.hash(user.password, 8);
        });

        return this;
    }

    
    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }

    static associate(models) {
        this.hasMany(models.Publisher, { foreignKey: 'creator_id', as: 'publisher'})
        this.hasMany(models.Book, { foreignKey: 'creator_id', as: 'book'})
        this.hasMany(models.Author, { foreignKey: 'creator_id', as: 'author'})
    }
};

module.exports = User;