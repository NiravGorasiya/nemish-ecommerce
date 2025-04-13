

const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../queries/generic")
const { DataNotFoundError } = require("../../errors")
const { convertQuery } = require("../../utils/paginationUtils")

const createShippingAddressCtrl = async (ctrlData) => {    
    const shippingAddress = await createModelItemQ('ShippingAddresses', ctrlData)
    return shippingAddress
}

const getShippingAddressCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const shippingAddresss = await findModelItemsQ('ShippingAddresses', {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    })

    return shippingAddresss;
}

// Delete a Colour
const updateShippingAddressCtrl = async (ctrlData) => {
    const cart = await findModelItemQ('ShippingAddresses', { where: { id: ctrlData.shippingAddressId } })
    if (cart) {
        await cart.update({ ...ctrlData })
        const cartData = await findModelItemQ('ShippingAddresses', { where: { id: ctrlData.shippingAddressId }, raw: true })
        return cartData
    } else {
        throw new DataNotFoundError()
    }
}

const deleteShippingAddressCtrl = async (ctrlData) => {
    const shippingAddress = await findModelItemQ('ShippingAddresses', {
        where: {
            id: ctrlData.shippingAddressId
        }
    })
    if (shippingAddress) {
        const destroyedShipping = await shippingAddress.destroy()
        return destroyedShipping
    } else {
        throw new DataNotFoundError('The requested resource does not exist')
    }
}

const getoneShippingAddressCtrl = async(ctrlData)=>{
    const Category = await findModelItemQ('ShippingAddresses',{
        where:{
            id: ctrlData.shippingAddressId
        }
    })
    if(!Category){
        throw new DataNotFoundError('Category not exit')
    }
    return Category
}

module.exports = {
    createShippingAddressCtrl,
    getShippingAddressCtrl,
    updateShippingAddressCtrl,
    deleteShippingAddressCtrl,
    getoneShippingAddressCtrl,
}