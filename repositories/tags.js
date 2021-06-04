const { Tag } = require('../models');

module.exports = {
    //find Tags count
    async getAllTagsCount(){
        return await Tag.count();
    },
    getAllTags(){
        return Tag.findAll();
    },
    getTag(id) {
        return Tag.findOne({
            where: {
            id: id
            }
      });
    },
    async addTag(mTag) {
        var tag = await Tag.create(mTag)
		return Tatagg
    },
    async updateTag(id,TagData) {
        return await Tag.update(TagData, {
			where: {
				id:id
			}
		})
    },
    async deleteTag(id) {
        return await Tag.destroy({
			where: {
				id: id
			}
		});
    },

    }