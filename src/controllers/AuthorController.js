const authorService = require('../services/authorService');
const utils = require('../utils/utils');

module.exports = {
    async index(req, res) {
        try {
            const authors = await authorService.index(req.userId);

            return utils.handleResponse(res, authors);
        } catch (e) {
            return utils.handleError(res, 'Unable to view authors');
        }
    },

    async store(req, res) {
        try {
            const createAuthor = await authorService.store({
                ...req.data,
                creator_id: req.userId
            });

            return utils.handleResponse(res, createAuthor);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const author = await authorService.show({
                creator_id: req.userId,
                author_id: req.params.id
            });

            return utils.handleResponse(res, author);
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
        
            await authorService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch(e) {
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            await authorService.delete({
                ...req.filter,
                creator_id: req.userId
            });

            return utils.handleResponse(res, `The author ${req.filter.id} was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    }
}