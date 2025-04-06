const { createModelItemQ } = require("../../queries/generic")

const createWhishlistCtrl = async (ctrlData) => {
    const branch = await createModelItemQ('Wishlists', ctrlData)
    return branch
}

module.exports = {
    createWhishlistCtrl
}