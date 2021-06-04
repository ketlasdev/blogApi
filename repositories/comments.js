const { Comment } = require('../models');
const { Article } = require('../models');

module.exports = {
    //find Comments count
    async getAllCommentsCount(){
        return await Comment.count();
    },
    getAllComments(){
        return Comment.findAll({
            
        });
    },
    getComment(id) {
        return Comment.findOne({
            where: {
            id: id
            }
      });
    },
    getArticleComments(mArticleId) {
        return Comment.findAll({
            where: {
                ArticleId: mArticleId
            }
      });
    },
    async addComment(mComment) {
        var comment = await Comment.create(mComment)
		return comment
    },
    async updateComment(id,CommentData) {
        return await Comment.update(CommentData, {
			where: {
				id:id
			}
		})
    },
    async deleteComment(id) {
        return await Comment.destroy({
			where: {
				id: id
			}
		});
    },

    }