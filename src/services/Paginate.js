/* eslint-disable class-methods-use-this */
class Paginate {
  async paginating(model, pageSize, pageLimit, optionsQuery) {
    const limitNumber = parseInt(pageLimit, 10) || 10;
    const page = parseInt(pageSize, 10) || 1;
    let options = optionsQuery;
    options = {
      ...options,
      offset: Paginate.getOffset(page, limitNumber),
      limit: limitNumber,
    };
    const { count, rows } = await model.findAndCountAll(options);

    return {
      previousPage: Paginate.getPreviousPage(page),
      currentPage: page,
      nextPage: Paginate.nextPage(page, limitNumber, count),
      total: count,
      limit: limitNumber,
      data: rows,
    };
  }

  getOffset(page, limit) {
    return (page * limit) - limit;
  }

  getNextPage(page, limit, total) {
    if ((total / limit) > page) {
      return page + 1;
    }

    return null;
  }

  getPreviousPage(page) {
    if (page <= 1) {
      return null;
    }

    return page - 1;
  }
}

module.exports = new Paginate();
