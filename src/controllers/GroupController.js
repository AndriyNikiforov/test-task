/* eslint-disable class-methods-use-this */
const Paginate = require('../services/Paginate');
const IdValidator = require('../validators/IdValidator');
const GroupCreateValidator = require('../validators/GroupCreateValidator');
const GroupUpdateValidator = require('../validators/GroupUpdateValidator');
const { Group, User } = require('../models');

class GroupController {
  async index(request, response) {
    const { page = 1, limit = 10, user_id: userId } = request.body;
    const data = await Paginate.paginating(Group, page, limit, {
      where: {
        owner_id: userId,
      },
    });

    return response.send({ data });
  }

  async detail(request, response) {
    const data = request.params;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    const groupData = await Group.findByPk(result.id, {
      include: User,
    });

    return response.send({
      success: true,
      group: groupData,
    });
  }

  async create(request, response) {
    const { body: data } = request;
    const result = GroupCreateValidator(data);

    if (!result.owner_id) {
      return response.json(result);
    }

    await Group.create(result);

    return response.send({
      success: true,
    });
  }

  async update(request, response) {
    const { body: data } = request;
    const result = GroupUpdateValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    await Group.update(result, {
      where: {
        id: result.id,
      },
    });

    return response.send({
      success: true,
    });
  }

  async remove(request, response) {
    const data = request.params;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    await Group.destroy({
      where: {
        id: data.id,
      },
    });

    return response.send({
      success: true,
    });
  }
}

module.exports = new GroupController();
