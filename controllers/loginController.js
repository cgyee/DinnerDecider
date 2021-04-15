const { request, response } = require("express");

const Users = require('../models/User');

module.exports = {
    postLogin: async (request, response) => {
        try {
            const user = await Users.findOne(request.body);
            console.log(user);     
        } catch (error) {
            console.log(error);
        }
    }
}