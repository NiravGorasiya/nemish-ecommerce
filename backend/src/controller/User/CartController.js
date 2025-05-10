const sequelize = require("../../models/sequelize")
const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../queries/generic")
const { convertQuery } = require("../../utils/paginationUtils")

const createCartCtrl = async (ctrlData) => {
    console.log(ctrlData, 'ctrlData');
    const findProduct = await findModelItemQ('Carts', { where: { userId: ctrlData?.userId, productId: ctrlData.productId }, raw: true })
    let cart
    if (!findProduct) {
        branch = await createModelItemQ('Carts', ctrlData)
    }
    return cart
}

const getCartCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const carts = await findModelItemsQ(
        'Carts',
        {},
        {
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: sequelize.models.Products,
                    as: 'Products',
                    attributes: ['Id', 'name', 'finalPrice', 'stockQuantity'],
                    required: false,
                    include: [{
                        model: sequelize.models.ProductColours,
                        as: "colours",
                        attributes: ['colorId'],
                        required: false,
                        include: [
                            {
                                model: sequelize.models.Colours,
                                as: 'colour',
                                attributes: ['name', "Id"],
                                required: false,
                            },
                            {
                                model: sequelize.models.ProductColorImages,
                                as: 'images',
                                required: false
                            }
                        ]
                    }]
                }
            ],
            raw: false
        },
        true
    );

    return carts
}

// Delete a Colour
const updateCartCtrl = async (ctrlData) => {
    const cart = await findModelItemQ('Carts', { where: { id: ctrlData.cartId } })
    if (cart) {
        await cart.update({ ...ctrlData })
        const cartData = await findModelItemQ('Carts', { where: { id: ctrlData.cartId }, raw: true })
        return cartData
    } else {
        throw new DataNotFoundError()
    }
}

const deleteCartCtrl = async (ctrlData) => {
    const cart = await findModelItemQ('Carts', {
        where: {
            id: ctrlData.cartId
        }
    })
    if (cart) {
        const destroyedCart = await cart.destroy()
        return destroyedCart
    } else {
        throw new DataNotFoundError('The requested resource does not exist')
    }
}

const getoneCartCtrl = async (ctrlData) => {
    const Category = await findModelItemQ('Carts', {
        where: {
            id: ctrlData.categoryId
        }
    })
    if (!Category) {
        throw new DataNotFoundError('Category not exit')
    }
    return Category
}

module.exports = {
    createCartCtrl,
    getCartCtrl,
    updateCartCtrl,
    deleteCartCtrl,
    getoneCartCtrl,
}