const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../queries/generic")
const { convertQuery } = require("../../utils/paginationUtils")
const sequelize = require("../../models/sequelize")

const getUserProductCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)
    const userProduct = await findModelItemsQ(
        'Products',
        {},
        {
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: sequelize.models.ProductColours,
                    as: "colours",
                    attributes: ['colorId'],
                    include: [
                        {
                            model: sequelize.models.Colours,
                            as: 'colour',
                            attributes: ['name', "Id"]
                        },
                        {
                            model: sequelize.models.ProductColorImages,
                            as: 'images'
                        }
                    ]
                }
            ],
            raw: false,
        },
        true
    );

    return userProduct;
}

module.exports = {
    getUserProductCtrl
}