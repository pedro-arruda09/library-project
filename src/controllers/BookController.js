const bookService = require('../services/bookService');
const utils = require('../utils/utils');

module.exports = {
    async index(req, res) {
        try {
            const books = await bookService.index(req.userId);

            return utils.handleResponse(res, books);
        } catch (e) {
            return utils.handleError(res, 'Unable to view books');
        }
    },

    async store(req, res) {
        try {
            const createBook = await bookService.store({
                ...req.data,
                creator_id: req.userId,
            });

            return utils.handleResponse(res, createBook);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const book = await bookService.show({
                ...req.filter,
                creator_id: req.userId
            });
            return utils.handleResponse(res, book);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async update(req, res) {
        try {
            const changes = req.data;
            const filter = {
                id: req.filter.id, 
                creator_id: req.userId
            };
        
            await bookService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch(e) {
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            await bookService.delete({
                ...req.filter,
                creator_id: req.userId
            });

            return utils.handleResponse(res, `The book ${req.filter.id} was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    },

    async sendToBookDb(req, res) {
        try {
            await bookService.sendToBookDb({
                book_cover_id: req.body.book_cover_id,
            });

            return res.json("Book cover updated");
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                error: "Unable to change book cover",
            });
        }
    },
}