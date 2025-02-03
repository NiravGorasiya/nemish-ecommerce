const sequelize = require("../../../models/sequelize");
const { DataNotFoundError } = require("../../../errors");
const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");

const createProductCtrl = async (ctrlData) => {
    console.log(ctrlData,'ctrlData');
    
    const product = await createModelItemQ('Products', ctrlData)

    if (ctrlData.size_id.length > 0) {
        ctrlData.size_id?.map(async (item) => {
            let productsize = { productId: product.Id, size_id: item }
            await createModelItemQ('ProductSizes', productsize)
        })
    }

    if (ctrlData.productColorImages.length > 0) {
        ctrlData.productColorImages?.map(async (color) => {            
            let productColor = { productId: product.Id, color_id: color.color_id, images: color.images }
            await createModelItemQ('ProductColour', productColor)
        })
    }

    return product
}

const getAllProdctCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const product = await findModelItemsQ('Products', {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: sequelize.models.SubCategories,
                as: 'SubCategories',
            },
            {
                model: sequelize.models.ProductSizes,
                as: "sizes",
                include: [
                    {
                        model: sequelize.models.Sizes,
                        as: 'size'
                    }
                ]
            }
        ]
    })
    console.log(product, 'product');

    return product;
}

const updateProductCtrl = async (ctrlData) => {
    const product = await findModelItemQ('Products', { where: { id: ctrlData.productId } })
    if (product) {
        await product.update({ ...ctrlData })
        const productData = await findModelItemQ('Products', { where: { id: ctrlData.productId } })
        return productData
    } else {
        throw new DataNotFoundError()
    }
}

const deleteProductCtrl = async (ctrlData) => {
    const product = await findModelItemQ('Products', {
        where: {
            id: ctrlData.productId
        }
    })
    if (product) {
        const destroyedproducts = await product.destroy()
        return destroyedproducts
    } else {
        throw new DataNotFoundError('The requested resource does not exist')
    }
}

const getoneProductCtrl = async (ctrlData) => {
    const product = await findModelItemQ('Products', {
        where: {
            id: ctrlData.productId
        },
        include:[
            {
                model: sequelize.models.SubCategories,
                as: 'SubCategories',
            },
            {
                model: sequelize.models.ProductSizes,
                as: "sizes",
                include: [
                    {
                        model: sequelize.models.Sizes,
                        as: 'size'
                    }
                ]
            }
        ]
    })
    if (!product) {
        throw new DataNotFoundError('Product not exit')
    }
    return product
}


module.exports = {
    createProductCtrl,
    getAllProdctCtrl,
    updateProductCtrl,
    getoneProductCtrl,
    deleteProductCtrl
};
