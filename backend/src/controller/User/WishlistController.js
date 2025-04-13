const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../queries/generic")
const { convertQuery } = require("../../utils/paginationUtils")

const createWhishlistCtrl = async (ctrlData) => {
    const branch = await createModelItemQ('Wishlists', ctrlData)
    return branch
}

const getWhishlisCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)
    const wishlists = await findModelItemsQ('Wishlists', { userId: queryData.userId }, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    })
    return wishlists
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