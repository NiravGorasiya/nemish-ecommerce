const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../../queries/generic")
const { convertQuery } = require("../../../utils/paginationUtils")
const { DataNotFoundError } = require("../../../errors")

const createCategoryCtrl = async (ctrlData) => {
    const branch = await createModelItemQ('Categories', ctrlData)
    return branch
}

const getCategoryCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const category = await findModelItemsQ('Categories', {}, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    })

    return category;
}

const updateCategoryCtrl = async (ctrlData) => {
    const category = await findModelItemQ('Categories', { where: { id: ctrlData.categoryId } })
    if (category) {
        await category.update({ ...ctrlData })
        const categoryData = await findModelItemQ('Categories', { where: { id: ctrlData.categoryId }, raw: true })
        return categoryData
    } else {
        throw new DataNotFoundError()
    }
}

const deleteCategoryCtrl = async (ctrlData) => {
    const category = await findModelItemQ('Categories', {
        where: {
            id: ctrlData.categoryId
        }
    })
    if (category) {
        const destroyedCategorys = await category.destroy()
        return destroyedCategorys
    } else {
        throw new DataNotFoundError('The requested resource does not exist')
    }
}

const getoneCategoryCtrl = async (ctrlData) => {
    const Category = await findModelItemQ('Categories', {
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
    createCategoryCtrl,
    getCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
    getoneCategoryCtrl
}