const AuthorModel = require('../models/AuthorModel');

module.exports = {

    async index() {
        await AuthorModel.findAll({
            attributes: ['name']
        });
    },

    store(data) {
        return AuthorModel.create(data);
    },

    show(filter) {
        return AuthorModel.findOne({
            where: filter
        })
    },

    async update(filter, changes) {
        return AuthorModel.update(changes, {
            where: filter,
        });
    },

    async delete(filter) {
        await this.show(filter);

        return AuthorModel.destroy({
            where: filter
        });
    }

}