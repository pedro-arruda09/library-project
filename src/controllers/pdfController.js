const pdfService = require('../services/pdfService');
const utils = require('../utils/utils');

module.exports = {

    async index(req, res) {
        try {
            const pdf = await pdfService.index()
            res.type('pdf');    
            res.download(pdf);
            return res.json(pdf);
        } catch (e) {
            console.log(e);
            return utils.handleError(res, 'Unable to generate PDF!');
        }
    }
};