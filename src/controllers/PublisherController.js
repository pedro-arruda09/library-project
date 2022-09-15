const publisherService = require('../services/publisherService');
const utils = require('../utils/utils');

module.exports = {
    async index(req, res) {
        try {
            const authors = await publisherService.index({
                attributes: ['creator_id', 'name']
            });

            return utils.handleResponse(res, authors);
        } catch (e) {
            return utils.handleError(res, 'Unable to view users.')
        }
    },

    async store(req, res) {
        try {
            const createPublisher = await publisherService.store({
                ...req.data,
                creator_id: req.userId
            });

            return utils.handleResponse(res, createPublisher);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const publisher = await publisherService.show({
                ...req.filter,
                creator_id: req.userId
            });

            return utils.handleResponse(res, publisher);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async show(req, res) {
        try {
            const student = await publisherService.show({
                ...req.filter,
                creator_id: req.userId
            });
            return utils.handleResponse(res, student);
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
        
            await publisherService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch(e) {
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            await publisherService.delete({
                ...req.filter,
                creator_id: req.userId
            });

            return utils.handleResponse(res, `The publisher ${req.filter.id} was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    }
}