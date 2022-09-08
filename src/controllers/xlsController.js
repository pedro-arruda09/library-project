const xlsService = require('../services/xlsService');
const utils = require('../utils/utils');

module.exports = {

    async index(req, res) {
        try {
            const xls = xlsService.generateXLS({
               student_id: req.filter.student_id
            })
            return utils.handleResponse(res, xls);
        } catch (e) {
            return utils.handleError(res, 'Unable to generate XLS!');
        }
    }
};