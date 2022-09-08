const req = require('express/lib/request');
const studentService = require('../services/studentService');
const utils = require('../utils/utils')

module.exports = {
    async index(req, res) {
        try {
            const students = await studentService.index({
                creator_id: req.userId
            });

            return utils.handleResponse(res, students);
        } catch (e) {
            return utils.handleError(res, 'Unable to view students.')
        }
    },

    async store(req, res) {
        try {
            const createAuthor = await studentService.store({
                ...req.data,
                creator_id: req.userId
            });

            return utils.handleResponse(res, createAuthor);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.message });
        }
    },

    async show(req, res) {
        try {
            const student = await studentService.show({
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

            await studentService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch (e) {
            return utils.handleError(res, e)
        }
    },

    async delete(req, res) {
        try {
            await studentService.delete({
                ...req.filter,
                creator_id: req.userId
            });

            return utils.handleResponse(res, `The student ${req.filter.id} was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    },

    async reservation(req, res) {
        try {
            await studentService.reservation({
                student_id: req.filter.student_id,
                book_ids: req.data.book_ids,
            });
            return res.json("Student reservation made");
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                error: "This reservation cannot be made",
            });
        }
    },
};