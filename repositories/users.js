const { User } = require('../models');

module.exports = {
    //find users count
    async getAllUsersCount(){
        return await User.count();
    },
    getAllUsers(){
        return User.findAll();
    },
    // méthodes à implémenter
    async getUsers(offset = 0, limit = 10) { 
        return await User.findAll({offset: offset, limit: limit});
    },
    getAdmins() {
        return User.findAll({
                where: {
                role: "admin"
                }
          });
     },
    getAuthors() {
        return User.findAll({
            where: {
            role: "author"
            }
      });
    },
    getGuests(){
        return User.findAll({
            where: {
            role: "guest"
            }
      });
    },
    getUser(id) {
        return User.findOne({
            where: {
            id: id
            }
      });
    },
    async getUserByEmail(email) {
        return await User.findOne({
            where: {
            email: email
            }
      });
    },
    async addUser(user) {
        var user = await User.create(user)
		return user
    },
    async updateUser(id,userData) {
        return await User.update(userData, {
			where: {
				id:id
			}
		})
    },
    async deleteUser(id) {
        return await User.destroy({
			where: {
				id: id
			}
		});
    },

    }