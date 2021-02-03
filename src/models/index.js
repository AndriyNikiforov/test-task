const Like = require('./Like');
const View = require('./View');
const User = require('./User');
const Token = require('./Token');
const Group = require('./Group');
const GroupNew = require('./GroupNew');
const GroupEvent = require('./GroupEvent');
const GroupInvited = require('./GroupInvited');
const Manifest = require('./Manifest');

User.hasMany(Token, { as: 'tokens', foreignKey: 'user_id' });

Manifest.hasMany(Like, { as: 'liked', foreignKey: 'entity_id' });
Manifest.hasMany(View, { as: 'views', foreignKey: 'entity_id' });

User.hasMany(Group, { as: 'groups', foreignKey: 'owner_id' });
Group.belongsTo(User, { as: 'owners', foreignKey: 'owner_id' });

User.hasMany(GroupInvited, { as: 'groupInvites', foreignKey: 'user_id' });
GroupInvited.belongsTo(User, { as: 'userInvites', foreignKey: 'user_id' });
GroupInvited.belongsTo(Group, { as: 'invitedToGroups', foreignKey: 'group_id' });
Group.hasMany(GroupInvited, { as: 'groupInvites', foreignKey: 'group_id' });

GroupNew.belongsTo(Group, { as: 'groupsList', foreignKey: 'group_id' });
Group.hasMany(GroupNew, { as: 'groupNews', foreignKey: 'group_id' });

GroupEvent.belongsTo(Group, { as: 'eventGroups', foreignKey: 'group_id' });
Group.hasMany(GroupEvent, { as: 'events', foreignKey: 'group_id' });

module.exports = {
  User,
  Token,
  Manifest,
  Like,
  View,
  Group,
  GroupEvent,
  GroupInvited,
  GroupNew,
};
