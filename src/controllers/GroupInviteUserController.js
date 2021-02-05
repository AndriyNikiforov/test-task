/* eslint-disable class-methods-use-this */
const Paginate = require('../services/Paginate');
const IdValidator = require('../validators/IdValidator');
const GroupInviteCreateValidator = require('../validators/GroupInviteCreateValidator');
const { GroupInvite, Group } = require('../models');

class GroupInviteUserController {
  async index(request, response) {
    const { page = 1, limit = 10, user_id: userId } = request.body;
    const data = await Paginate.paginating(GroupInvite, page, limit, {
      where: {
        user_id: userId,
      },
    });

    return response.send({
      success: true,
      invites: data,
    });
  }

  async detail(request, response) {
    const data = request.params;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    const inviteData = await GroupInvite.findByPk({
      where: {
        id: result.id,
        user_id: data.user_id,
      },
      include: Group,
    });

    return response.send({
      success: true,
      invite: inviteData,
    });
  }

  async push(request, response) {
    const data = request.body;
    const result = GroupInviteCreateValidator(data);

    if (!result.user_id) {
      return response.send(result);
    }

    result.status = 'waiting';
    await GroupInvite.create(result);

    return response.send({
      success: true,
    });
  }
}

module.exports = new GroupInviteUserController();
