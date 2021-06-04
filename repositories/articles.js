const { Article } = require('../models');
const { Comment } = require('../models');

module.exports = {
    //find Articles count
    async getAllArticlesCount(){
        return await Article.count();
    },
    getAllArticles(){
        return Article.findAll();
    },
    async getAllArticlesComments(){
        return await Article.findAll(
            {
                attributes: ['title'],
                include: [{
                    model: Comment
                  }]
            }
            
            );
    },
    getArticle(id) {
        return Article.findOne({
            where: {
            id: id
            }
      });
    },
    getUserArticles(userId) {
        return Article.findAll({
            where: {
            UserId: userId
            }
      });
    },
     addArticle(mArticle) {
        Article.create(mArticle)
        .then(e=>{
            console.log(e)
            return e
        }).catch(e=>{
            console.log(e)
            return e
        })
		
    },
    async updateArticle(id,articleData) {
        return await Article.update(articleData, {
			where: {
				id:id
			}
		})
    },
    async deleteArticle(id) {
        return await Article.destroy({
			where: {
				id: id
			}
		});
    },

    }