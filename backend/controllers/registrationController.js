const User = require('../models/User');

module.exports = {

    createNewUser: async (request, response) => {
        try {
            const newUser = await User.create(request.body);
            console.log(newUser);
        } catch (error) {
            console.log(error);
        }
    }
}