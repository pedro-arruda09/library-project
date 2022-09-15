const BookCoverModel = require('../models/BookCoverModel');

module.exports = {

    index(data) {
        return BookCoverModel.findAll(data);
    },

    async store(data) {
        await BookCoverModel.create(data)
    },

    async delete(filter) {
        return BookCoverModel.destroy(filter);
    }
}