const BookModel = require('../models/BookModel');

module.exports = {

    async index() {
        await BookModel.findAll({
            attributes: ['name', 'synopsis', 'publish_date']
        });
    },

    store(data) {
        return BookModel.create(data);
    },

    show(filter) {
        return BookModel.findOne({
            where: filter
        })
    },

    update(filter, changes) {
        return BookModel.update(changes, {
            where: filter,
        });
    },

    async delete(filter) {
        await this.show(filter);

        return BookModel.destroy({
            where: filter
        });
    }
}