const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../queries/generic")
const { convertQuery } = require("../../utils/paginationUtils")
const sequelize = require("../../models/sequelize")

const createWhishlistCtrl = async (ctrlData) => {
    const branch = await createModelItemQ('Wishlists', ctrlData)
    return branch
}

const getWhishlisCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)
    const wishlists = await findModelItemsQ(
        'Wishlists',
        { userId: queryData.userId },
        {
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: sequelize.models.Products,
                    as: 'Products',
                    attributes: ['Id', 'name', 'finalPrice', 'stockQuantity'],
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
                }
            ],
            raw: false
        },
        true // count
    );

    return wishlists;
}

const deleteWhishlistCtrl = async (ctrlData) => {
    const cart = await findModelItemQ('Wishlists', {
        where: {
            id: ctrlData.wishlistId
        }
    })
    if (cart) {
        const destroyedWish = await cart.destroy()
        return destroyedWish
    } else {
        throw new DataNotFoundError('The requested resource does not exist')
    }
}

module.exports = {
    createWhishlistCtrl,
    getWhishlisCtrl,
    deleteWhishlistCtrl
}