const {User} = require('../../models');

/**
 * Create user
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string?} username
 * @return {Promise<User | null>}
 */
module.exports.createUser = async ({firstName, lastName, email, username}) => {
    if(!username && email) {
        [username] = email.split("@");
    }
    return User.create({firstName, lastName, email, username});
};

/**
 * Update Users
 * @param {*} query
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} username
 * @return {Promise<[number, User[]]>}
 */
module.exports.updateUsers = async (query, {firstName, lastName, email, username}) => {
    return User.update({firstName, lastName, email, username}, {where: query});
};

/**
 * Delete Users
 * @param {any} query
 * @return {Promise<number>}
 */
module.exports.deleteUsers= async (query) => {
    return User.destroy({where: query});
};

/**
 * Find Users
 * @param {*} query
 * @return {Promise<User[]>}
 */
module.exports.findUsers = async (query) => {
    return User.findAll({where: query});
};



