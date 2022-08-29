const UserModel = require('../models/UserModel');

module.exports = {
    findUser(email) {
        return UserModel.findOne({
            where: {
                email
            }
        })
    }
}