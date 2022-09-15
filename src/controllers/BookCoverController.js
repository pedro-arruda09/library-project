const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const utils = require('../utils/utils');
const bookCoverService = require('../services/bookCoverService');
const upload = multer(multerConfig).single('bookCover');

module.exports = {

  async index(req, res) {
    const book_covers = await bookCoverService.index({
      attributes: ['originalname']
    });
    return utils.handleResponse(res, book_covers)
  },

  async store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        console.log(error);
        return res.status(401).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { book_id } = req.body;
        await bookCoverService.store({ originalname, filename, book_id, creator_id: req.userId })
        return utils.handleResponse(res, 'The book cover was registered.')
      } catch (e) {
        return utils.handleError(res, e);
      }
    })
  },

  async delete(req, res) {
    try {
      await bookCoverService.delete({
        where: {
          id: req.params.id,
          creator_id: req.userId
        }
      });

      return utils.handleResponse(res, 'The book cover was deleted succesfully.');
    } catch (e) {
      console.log(e);
      return utils.handleError(res, e);
    }
  },
}