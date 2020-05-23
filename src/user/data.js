const User = require('../../models').user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const secret = process.env.APP_SECRET;
const { Op } = require("sequelize");
const {
    AuthenticationError,
} = require('apollo-server');

const jwtExpireTime = "30 days";

module.exports = {
    getAll: (username, id) => {
        let condition = {};
        if(username) {
            condition = {
                where: {
                    [Op.and]: {
                        id: { [Op.not]: id },
                        username: { [Op.startsWith]: username }
                    }
                }
            }
        }
        return User.findAll(condition)
            .then(users => {
                return users;
            })
            .catch(error => {
                throw new Error(error);
            });
    },

    get: (id) => {
        return User.findByPk(id)
            .then(user => {
                return user
            }).catch(error => {
                throw error;
            });
    },
    register: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
        return User.create(user)
            .then(user => {
                const token = jwt.sign({id: user.id}, secret, {
                    expiresIn: jwtExpireTime
                });
                return {token}
            });
    },
    login: (username, password) => {
        return User.findOne({
            where: {
                username
            }
        }).then(user => {
            if (user === null)
                throw new AuthenticationError("Username and Password Does not Match");

            const token = jwt.sign({id: user.id}, secret, {
                expiresIn: jwtExpireTime
            });
            let passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid)
                throw new AuthenticationError("Username and Password Does not Match");
            return {token}
        });
    }
};
