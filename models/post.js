// const Sequelize = require('sequelize');


'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    category: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;

};