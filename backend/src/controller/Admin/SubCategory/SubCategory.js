const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../../queries/generic")
const { convertQuery } = require("../../../utils/paginationUtils")
const { DataNotFoundError } = require("../../../errors")
const sequelize = require("../../../models/sequelize")

const createSubCategoryCtrl = async (ctrlData) => {
    const subcategory = await createModelItemQ('SubCategories', ctrlData)
    return subcategory
}

const getSubCategoryCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const subCategory = await findModelItemsQ('SubCategories', {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: sequelize.models.Categories,
                as: 'Categories',
            }
        ],
    }, false)

    return subCategory;
}

const updateSubCategoryCtrl = async (ctrlData) => {
    const subCategory = await findModelItemQ('SubCategories', { where: { id: ctrlData.subCategoryId } })
    if (subCategory) {
        await subCategory.update({ ...ctrlData })
        const subcategoryData = await findModelItemQ('SubCategories', {
            where: {
                id: ctrlData.subCategoryId
            },
            include: [
                {
                    model: sequelize.models.Categories,
                    as: 'Categories' 
                }
            ]
        },false);
        return subcategoryData
    } else {
        throw new DataNotFoundError()
    }
}

const deleteSubCategoryCtrl = async (ctrlData) => {
    const subCategory = await findModelItemQ('SubCategories', {
        where: {
            id: ctrlData.subCategoryId
        }
    })
    if (subCategory) {
        const destroyedsubCategorys = await subCategory.destroy()
        return destroyedsubCategorys
    } else {
        throw new DataNotFoundError('The requested resource does not exist')
    }
}

const getoneSubCategoryCtrl = async (ctrlData) => {
    const subCategory = await findModelItemQ('SubCategories', {
        where: {
            id: ctrlData.subcategoryId
        },
        include: [
            {
                model: sequelize.models.Categories,
                as: 'Categories',
            }
        ],
    })
    if (!Category) {
        throw new DataNotFoundError('SubCategory not exit')
    }
    return Category
}

module.exports = {
    createSubCategoryCtrl,
    getSubCategoryCtrl,
    updateSubCategoryCtrl,
    deleteSubCategoryCtrl,
    getoneSubCategoryCtrl
}