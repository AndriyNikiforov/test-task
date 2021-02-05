/* eslint-disable class-methods-use-this */
const Paginate = require('../services/Paginate');
const IdValidator = require('../validators/IdValidator');
const GroupInviteUpdateValidator = require('../validators/GroupInviteUpdateValidator');
const { GroupInvite, Group } = require('../models');

class GroupInviteAdminController {
  async index(request, response) {
    const { page = 1, limit = 10, group_id: groupId } = request.body;
    const data = await Paginate.paginating(GroupInvite, page, limit, {
      where: {
        group_id: groupId,
        status: 'waiting',
      },
      include: Group,
    });

    return response.send({
      success: true,
      invites: data,
    });
  }

  async approve(request, response) {
    const data = request.body;
    const result = GroupInviteUpdateValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    result.status = 'approved';
    await GroupInvite.update(result, {
      where: {
        id: result.id,
      },
    });

    return response.send({
      success: true,
    });
  }

  async reject(request, response) {
    const data = request.body;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    await GroupInvite.update({
      status: 'rejected',
    }, {
      where: {
        id: result.id,
      },
    });

    return response.send({
      success: true,
    });
  }
}

module.exports = new GroupInviteAdminController();
