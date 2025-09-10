const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../../queries/generic")
const { convertQuery } = require("../../../utils/paginationUtils")
const { DataNotFoundError } = require("../../../errors")

const createBannerCtrl = async (ctrlData) => {
    const branch = await createModelItemQ('Banners', ctrlData)
    return branch
}

const getBannerCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const banner = await findModelItemsQ('Banners', {}, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    })

    return banner;
}

const updateBannerCtrl = async (ctrlData) => {
    const banner = await findModelItemQ('Banners', { where: { id: ctrlData.bannerId } })
    if (banner) {
        await banner.update({ ...ctrlData })
        const bannerData = await findModelItemQ('Banners', { where: { id: ctrlData.bannerId }, raw: true })
        return bannerData
    } else {
        throw new DataNotFoundError()
    }
}

const deleteBannerCtrl = async (ctrlData) => {
    const banner = await findModelItemQ('Banners', {
        where: {
            id: ctrlData.bannerId
        }
    })
    if (banner) {
        const destroyedBanners = await banner.destroy()
        return destroyedBanners
    } else {
        throw new DataNotFoundError('The requested resource does not exist')
    }
}

const getOneBannerCtrl = async (ctrlData) => {
    const Banner = await findModelItemQ('Banners', {
        where: {
            id: ctrlData.bannerId
        }
    })
    if (!Banner) {
        throw new DataNotFoundError('Banner not exit')
    }
    return Banner
}

module.exports = {
    createBannerCtrl,
    getBannerCtrl,
    updateBannerCtrl,
    deleteBannerCtrl,
    getOneBannerCtrl
}