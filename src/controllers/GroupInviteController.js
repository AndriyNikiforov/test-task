/* eslint-disable class-methods-use-this */
const Paginate = require('../services/Paginate');
const IdValidator = require('../validators/IdValidator');
const GroupInviteCreateValidator = require('../validators/GroupInviteCreateValidator');
const GroupInviteUpdateValidator = require('../validators/GroupInviteUpdateValidator');
const { GroupInvite, Group } = require('../models');

class GroupInviteController {
  async index(request, response) {
    const { page = 1, limit = 10 } = request.body;
    const data = await Paginate.paginating(GroupInvite, page, limit);

    return response.send({
      success: true,
      invites: data,
    });
  }

  async detail(request, response) {
    const data = request.body;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    const inviteData = await GroupInvite.findByPk(result.id, {
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

module.exports = new GroupInviteController();
