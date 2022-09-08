const { Model, DataTypes } = require('sequelize');

class Publisher extends Model {
    static init(sequelize) {
        super.init({
            name: { type: DataTypes.STRING },
        }, {
            sequelize,
            paranoid: true,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
        this.hasMany(models.Book, { foreignKey: 'publisher_id', as: 'book '});
    }
}

module.exports = Publisher;