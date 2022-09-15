const BookModel = require('../models/BookModel');
const BookCoverModel = require('../models/BookCoverModel');

module.exports = {

  index() {
    return BookModel.findAll({
      attributes: ['name', 'synopsis', 'publish_date'],
      include: {
        model: BookCoverModel,
        attributes: ['originalname'],
        as: 'book_covers'
      },
      raw: true,
      nest: true,
    });
  },

  store(data) {
    return BookModel.create(data);
    // Posso dar um bulkCreate para inserir as fotos?
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
  },
}