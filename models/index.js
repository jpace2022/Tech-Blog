const Blogpost = require('./Blogpost');
const Comment = require('./Comment');
const User = require("./User");


Blogpost.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Blogpost.hasMany(Comment, {
  foreignKey: 'blogId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
module.exports = { User, Comment, Blogpost };
