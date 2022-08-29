const { findByPk } = require('../models/UserModel');
const UserModel = require('../models/UserModel');

module.exports = {
    index() {
        return UserModel.findAll({
            attributes: ['name', 'email' ]
        });
    },

    store(data) {
        return UserModel.create(data);
    },

    async show(filter) {
        const user = await UserModel.findOne({
            where: filter
        });

        if (!user) {
            throw new Error('User does not exist.');
        }

        return user;
    },

    async update(filter, changes) {
        return UserModel.update(changes, {
            where: filter,
            individualHooks: true
        });
    },

    async delete(filter) {
        await this.show(filter);

        return UserModel.destroy({
            where: filter
        });
    }
};