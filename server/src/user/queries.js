const User = require('../../models').User;

module.exports = {
    getAll: ()=> {
        return User.findAll({
            attributes: ['id', 'username', 'email']
        }).then(users => users)
            .catch(error => {
                throw new Error(error);
        });
    },
    get: (id)=> {
        return User.findByPk(id,{
            attributes: ['id', 'username', 'email']
        }).then(user => {
            return user
        }).catch(error=>{
            throw error;
        })
    }
};
