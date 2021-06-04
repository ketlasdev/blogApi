'use strict';
let faker = require('faker');
let userData=[];
let ArticleData=[];
let CommentData=[];
let TagsData=[];
let articleTagsData=[];
//------ users
for(let i=0;i<20;i++){
  userData.push({
    username:faker.name.findName(),
    email:faker.internet.email(),
    password:faker.internet.password(8),
    role:(i==0?"admin":(i%5==0?"author":"guest")),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}
//------tags
for(let i=0;i<10;i++){
  TagsData.push({
    name:faker.name.findName(3),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}
//------articles
let userId=1;
let tagId=0;
for(let i=1;i<=20*2;i++){
  if(i%2!=0)userId+=1;
  tagId++;
  if(tagId>10)tagId=1;
  ArticleData.push({
    title:faker.lorem.words(3),
    content:faker.lorem.lines(2),
    published:new Date()+((24*60*60*60)*(Math.floor(Math.random() * 10)+1)),
    UserId:userId-1,
    TagId:tagId,
    createdAt:new Date(),
    updatedAt: new Date()
  });
}
//------articleTagsData
let id=1;let idTag=0;
for(let i=1;i<=40*4;i++){
  if(i%4==0)id++;
  idTag++;
  if(idTag>10)idTag=1;
  articleTagsData.push({
    ArticleId:(id==41?1:id),
    TagId:idTag,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}
//------ comments
let articleId=1;
for(let i=1;i<=20*2*4;i++){
  if(i%4==0)articleId++;
  CommentData.push({
    content:faker.lorem.lines(2),
    ArticleId:(articleId==41?40:articleId),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     //await queryInterface.bulkInsert('users', userData, {});
     //await queryInterface.bulkInsert('tags', TagsData, {});
     
     //await queryInterface.bulkInsert('articles', ArticleData, {});
    //await queryInterface.bulkInsert('articletags', articleTagsData, {});
     await queryInterface.bulkInsert('comments', CommentData, {});
     
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
