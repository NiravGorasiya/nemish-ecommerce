const sequelize = require("../../../models/sequelize");
const { DataNotFoundError } = require("../../../errors");
const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");
const BASE_IMAGE_URL = "http://localhost:3001/uploads/";

const createProductCtrl = async (ctrlData, files) => {
    console.log(ctrlData, 'ctrldata');
    console.log(files, 'files');


    const product = await createModelItemQ('Products', ctrlData);

    const uploadImages = files.map((file) => file.filename);
    console.log(uploadImages, 'uploadimages');

    if (Array.isArray(ctrlData.size_id) && ctrlData.size_id.length > 0) {
        await Promise.all(ctrlData.size_id?.map(async (item) => {
            let productSize = { productId: product.Id, sizeId: item };
            await createModelItemQ('ProductSizes', productSize);
        }));
    }


    if (Array.isArray(ctrlData.color_id) && ctrlData.color_id.length > 0) {

        const colorImageMap = {};

        ctrlData.color_id.forEach((colorId, index) => {
            if (!colorImageMap[colorId]) {
                colorImageMap[colorId] = [];
            }
            if (uploadImages[index]) {
                colorImageMap[colorId].push(uploadImages[index]);
            }
        });


        for (const colorId in colorImageMap) {
            let productColor = { productId: product.Id, colorId: colorId };
            const productColors = await createModelItemQ('ProductColours', productColor);

            const images = colorImageMap[colorId];
            if (images && images.length > 0) {
                for (const imageUrl of images) {
                    const productColorImage = { productColourId: productColors.Id, imageUrl: imageUrl };
                    await createModelItemQ('ProductColorImages', productColorImage);
                }
            }
        }
    }

    return product;
};


const getAllProdctCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const product = await findModelItemsQ('Products',{}, {
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
            },
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
        ]
    })

    return product;
}

const updateProductCtrl = async (productId, ctrlData, files) => {
    const product = await findModelItemQ('Products', { where: { id: productId } })

    if (!product) {
        throw new DataNotFoundError()
    }

    await product.update({ ...ctrlData })

    const uploadImages = files.map((file) => file.filename);

    if (Array.isArray(ctrlData.size_id) && ctrlData.size_id.length > 0) {
        await Promise.all(ctrlData.size_id?.map(async (item) => {
            let productSize = { productId: product.Id, sizeId: item };
            await createModelItemQ('ProductSizes', productSize);
        }));
    }

    if (Array.isArray(ctrlData.color_id) && ctrlData.color_id.length > 0) {

        const colorImageMap = {};

        ctrlData.color_id.forEach((colorId, index) => {
            if (!colorImageMap[colorId]) {
                colorImageMap[colorId] = [];
            }
            if (uploadImages[index]) {
                colorImageMap[colorId].push(uploadImages[index]);
            }
        });


        for (const colorId in colorImageMap) {
            let productColor = { productId, colorId };
            const productColors = await createModelItemQ('ProductColours', productColor);

            const images = colorImageMap[colorId];
            if (images && images.length > 0) {
                for (const imageUrl of images) {
                    const productColorImage = { productColourId: productColors.Id, imageUrl: imageUrl };
                    await createModelItemQ('ProductColorImages', productColorImage);
                }
            }
        }
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
        include: [
            {
                model: sequelize.models.SubCategories,
                as: 'SubCategories',
            },
            {
                model: sequelize.models.ProductSizes,
                as: "sizes",
                attributes: ['sizeId'],
                include: [
                    {
                        model: sequelize.models.Sizes,
                        as: 'size',
                        attributes: ['name', "Id"]
                    }
                ]
            },
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
        ]
    })

    if (!product) {
        throw new DataNotFoundError('Product not exit')
    }

    return {
        Id: product.Id,
        title: product.title,
        price: product.price,
        finalPrice: product.final_price,
        name: product.name,
        SKU: product.SKU,
        description: product.description,
        status: product.status,
        sizes: product.sizes.map(item => item.size) || [],
        colors: product.colours.reduce((acc, color) => {
            acc[color.colour.name.toLowerCase()] = color.images.map(
                (item) => `${BASE_IMAGE_URL}${item.imageUrl}`
            );
            return acc;
        }, {}),
    }
}


module.exports = {
    createProductCtrl,
    getAllProdctCtrl,
    updateProductCtrl,
    getoneProductCtrl,
    deleteProductCtrl
};
