const PublisherModel = require('../models/PublisherModel');

module.exports = {

    index() {
        return PublisherModel.findAll({
            attributes: ['creator_id', 'name']
        });
    },

    store(data) {
        return PublisherModel.create(data);
    },

    show(filter) {
        return PublisherModel.findOne({
            where: filter
        })
    },

    update(filter, changes) {
        return PublisherModel.update(changes, {
            where: filter,
        });
    },

    async delete(filter) {
        await this.show(filter);

        return PublisherModel.destroy({
            where: filter
        });
    }
}