const {testConnection} = require("./sequelize");
const {createUser} = require("./api/user/user.service");
testConnection().then(() => {
    createUser({
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'user1@example.org'
    }).then(user => {
        console.log(user);
    }).catch(error => {
        console.error(error);
    });
});

