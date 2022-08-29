const userService = require('../services/userService');
const utils = require('../utils/utils');

module.exports = {
    async index(req, res) {
        try {
            const users = await userService.index(req.userId);

            return utils.handleResponse(res, users);
        } catch (e) {
            return utils.handleError(res, 'Unable to view users.')
        }
    },

    async store(req, res) {
        try {
            const createUser = await userService.store({
                ...req.data
            });

            return utils.handleResponse(res, createUser);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const user = await userService.show(req.userId);

            return utils.handleResponse(res, user);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async update(req, res) {
        try {
            const changes = req.data;
            const filter = {
                id: req.userId
            };
        
            await userService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch(e) {
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            await userService.delete({
                id: req.userId,
            });

            return utils.handleResponse(res, `The user ${req.userId} was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    }
}