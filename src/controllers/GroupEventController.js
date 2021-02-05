/* eslint-disable class-methods-use-this */
const Paginate = require('../services/Paginate');
const IdValidator = require('../validators/IdValidator');
const GroupEventCreateValidator = require('../validators/GroupEventCreateValidator');
const GroupEventUpdateValidator = require('../validators/GroupEventUpdateValidator');
const { Group, GroupEvent } = require('../models');

class GroupEventController {
  async index(request, response) {
    const { page = 1, limit = 10 } = request.body;
    const data = await Paginate.paginating(GroupEvent, page, limit);

    return response.send({ data });
  }

  async detail(request, response) {
    const data = request.params;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    const eventData = await GroupEvent.findByPk(result.id, {
      include: Group,
    });

    return response.send({
      event: eventData,
    });
  }

  async create(request, response) {
    const { body: data } = request;
    const result = GroupEventCreateValidator(data);

    if (!result.group_id) {
      return response.send(result);
    }

    await GroupEvent.create(result);

    return response.send({
      success: true,
    });
  }

  async update(request, response) {
    const { body: data } = request;
    const result = GroupEventUpdateValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    await GroupEvent.update(result, {
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

    await GroupEvent.destroy({
      where: {
        id: result.id,
      },
    });

    return response.send({
      success: true,
    });
  }
}

module.exports = new GroupEventController();
