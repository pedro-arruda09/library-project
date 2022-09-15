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

    async sendToBookDb(req, res) {
        const totalReservations = await BookModel.count({
            where: {
              id: req.params.id,
              book_cover_id: null
            },
          });

          console.log(totalReservations);

        if (totalReservations !== book_id.length) {
          throw new Error("This reservation was already made!");
        }
    
        await BookModel.update({
          book_cover_id: req.body.book_cover_id
        }, {
          where: {
            id: req.params,
            book_cover_id: req.body.book_cover_id,
          }
        });
      }
}