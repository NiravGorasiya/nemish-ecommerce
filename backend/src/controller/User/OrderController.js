const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../queries/generic")
const { convertQuery } = require("../../utils/paginationUtils")

const createOrderCtrl = async (ctrlData) => {
    let orderData = {
        userId: ctrlData?.userId,
        orderDate: new Date(),
        ShippingMethodId: ctrlData?.ShippingMethodId,
        ShippingAddressId: ctrlData?.ShippingAddressId,
        status: 'pending',
        totalAmount: ctrlData?.totalAmount
    }
    const order = await createModelItemQ('Orders', orderData)

    for (const item of ctrlData.items) {
        const detailData = {
            orderId: order.Id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }
        await createModelItemQ('OrdersDetails', detailData)
    }
    return order;

}

const getUserOrderCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const carts = await findModelItemsQ('Orders', { userId: queryData.userId }, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    })

    return carts;
}

module.exports = {
    createOrderCtrl,
    getUserOrderCtrl,
}