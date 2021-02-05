/* eslint-disable class-methods-use-this */
const dayjs = require('dayjs');

const Paginate = require('../services/Paginate');
const IdValidator = require('../validators/IdValidator');
const GroupNewsCreateValidator = require('../validators/GroupNewsCreateValidator');
const GroupNewsUpdateValidator = require('../validators/GroupNewsUpdateValidator');
const { GroupNew, Group } = require('../models');

class GroupNewsController {
  async index(request, response) {
    const { page = 1, limit = 10 } = request.body;
    const data = await Paginate.paginating(page, limit);

    return response.send({
      success: true,
      news: data,
    });
  }

  async detail(request, response) {
    const { body: data } = request;
    const result = await IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    const articleData = await GroupNew.findByPk(result.id);

    return response.send({
      success: true,
      article: articleData,
    });
  }

  async create(request, response) {
    const { body: data } = request;
    const result = await GroupNewsCreateValidator(data);

    if (!result.group_id) {
      return response.send(result);
    }

    await GroupNew.create(data);

    return response.send({
      success: true,
    });
  }

  async update(request, response) {
    const { body: data } = request;
    const result = await GroupNewsUpdateValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    await GroupNew.update(result, {
      where: {
        id: result.id,
      },
    });

    return response.send({
      success: true,
    });
  }

  async updateStatus(request, response) {
    const { body: data } = request;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    const groupNew = await GroupNew.findByPk(result.id);
    groupNew.published_at = (result.type === 'publish') ? dayjs.format() : null;

    await groupNew.save();

    return response.send({
      success: true,
    });
  }

  async remove(request, response) {
    const { body: data } = request;
    const result = IdValidator(data);

    if (!result.id) {
      return response.send(result);
    }

    await GroupNew.destroy({
      where: {
        id: result.id,
      },
    });

    return response.send({
      success: true,
    });
  }
}

module.exports = new GroupNewsController();
