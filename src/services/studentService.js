const StudentModel = require('../models/StudentModel');

module.exports = {
    async index() {
        await StudentModel.findAll({
            attributes: ['name', 'registration', 'birth_date'],
        });
    },

    store(data) {
        return StudentModel.create(data);
    },

    show(filter) {
        return StudentModel.findOne({
            where: filter
        })
    },

    update(filter, changes) {
        return StudentModel.update(changes, {
            where: filter,
        });
    },

    async delete(filter) {
        await this.show(filter);

        return StudentModel.destroy({
            where: filter
        });
    }
};