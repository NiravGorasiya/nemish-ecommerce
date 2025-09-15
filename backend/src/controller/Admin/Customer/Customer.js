const { findModelItemsQ } = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");

const getCustomersCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit);

    const customer = await findModelItemsQ('Customer', {}, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    });
    return customer;
};


module.exports = {
    getCustomersCtrl
};
