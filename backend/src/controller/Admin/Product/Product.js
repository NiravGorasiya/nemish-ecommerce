const { Op } = require("sequelize");
const sequelize = require("../../../models/sequelize");
const { DataNotFoundError } = require("../../../errors");
const {
  createModelItemQ,
  findModelItemsQ,
  findModelItemQ,
} = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");
const { generateSKU } = require("../../../utils/common");
const BASE_IMAGE_URL = "http://localhost:5000/uploads/";

const createProductCtrl = async (ctrlData, files) => {
  try {
    ctrlData.SKU = generateSKU();

    let product = await findModelItemQ("Products", {
      where: { SKU: ctrlData.SKU },
    });

    if (!product) {
      product = await createModelItemQ("Products", ctrlData);
    }

    if (Array.isArray(ctrlData.size_id) && ctrlData.size_id.length > 0) {
      await Promise.all(
        ctrlData.size_id.map(async (sizeId) => {
          const productSize = {
            productId: product.Id,
            sizeId: Number(sizeId),
          };
          await createModelItemQ("ProductSizes", productSize);
        })
      );
    }

    const colorImageMap = {};

    if (Array.isArray(ctrlData.color_id) && files.length > 0) {
      ctrlData.color_id.forEach((colorId, index) => {
        if (!colorImageMap[colorId]) colorImageMap[colorId] = [];

        const file = files[index];
        if (file?.filename) {
          colorImageMap[colorId].push(file.filename);
        }
      });
    }

    for (const colorId in colorImageMap) {
      const productColor = {
        productId: product.Id,
        colorId,
      };

      const productColorEntry = await createModelItemQ(
        "ProductColours",
        productColor
      );

      for (const imageUrl of colorImageMap[colorId]) {
        const productColorImage = {
          productColourId: productColorEntry.Id,
          imageUrl,
        };
        await createModelItemQ("ProductColorImages", productColorImage);
      }
    }

    return product;
  } catch (error) {
    throw error;
  }
};

const getAllProdctCtrl = async (queryData) => {
  const { offset, limit } = await convertQuery(queryData.page, queryData.limit);

  const product = await findModelItemsQ(
    "Products",
    {},
    {
      offset,
      limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: sequelize.models.SubCategories,
          as: "SubCategories",
        },
        {
          model: sequelize.models.ProductSizes,
          as: "sizes",
          include: [
            {
              model: sequelize.models.Sizes,
              as: "size",
            },
          ],
        },
        {
          model: sequelize.models.ProductColours,
          as: "colours",
          attributes: ["colorId"],
          include: [
            {
              model: sequelize.models.Colours,
              as: "colour",
              attributes: ["name", "Id"],
            },
            {
              model: sequelize.models.ProductColorImages,
              as: "images",
            },
          ],
        },
      ],
    }
  );

  return product;
};

const updateProductCtrl = async (productId, ctrlData, files) => {
  try {
    const product = await findModelItemQ("Products", {
      where: { id: productId },
    });
    if (!product) throw new DataNotFoundError("Product not found");

    let sizeIds = [];
    if (ctrlData.size_id) {
      sizeIds = JSON.parse(ctrlData.size_id).map((item) =>
        typeof item === "object" ? item.Id : item
      );
    }

    await product.update({ ...ctrlData });

    if (sizeIds.length > 0) {
      await sequelize.models.ProductSizes.destroy({
        where: {
          productId: product.Id,
          sizeId: {
            [Op.notIn]: sizeIds,
          },
        },
      });

      await Promise.all(
        sizeIds.map(async (sizeId) => {
          await sequelize.models.ProductSizes.findOrCreate({
            where: { productId: product.Id, sizeId },
            defaults: { productId: product.Id, sizeId },
          });
        })
      );
    } else {
      await sequelize.models.ProductSizes.destroy({
        where: { productId: product.Id },
      });
    }

    const uploadImages = files.map((file) => file.filename);

    if (Array.isArray(ctrlData.color_id) && ctrlData.color_id.length > 0) {
      const colorImageMap = {};

      ctrlData.color_id.forEach((colorId, index) => {
        if (!colorImageMap[colorId]) colorImageMap[colorId] = [];
        if (uploadImages[index])
          colorImageMap[colorId].push(uploadImages[index]);
      });

      for (const colorId in colorImageMap) {
        const [productColor] =
          await sequelize.models.ProductColours.findOrCreate({
            where: { productId, colorId },
            defaults: { productId, colorId },
          });

        const images = colorImageMap[colorId];
        if (images.length > 0) {
          for (const imageUrl of images) {
            await sequelize.models.ProductColorImages.findOrCreate({
              where: { productColourId: productColor.Id, imageUrl },
              defaults: { productColourId: productColor.Id, imageUrl },
            });
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

const deleteProductCtrl = async (ctrlData) => {
  const product = await findModelItemQ("Products", {
    where: {
      id: ctrlData.productId,
    },
  });
  if (product) {
    const destroyedproducts = await product.destroy();
    return destroyedproducts;
  } else {
    throw new DataNotFoundError("The requested resource does not exist");
  }
};

const getoneProductCtrl = async (ctrlData) => {
  console.log(ctrlData, "ctrlData");

  const product = await findModelItemQ("Products", {
    where: {
      id: ctrlData.productId,
    },
    include: [
      {
        model: sequelize.models.SubCategories,
        as: "SubCategories",
      },
      {
        model: sequelize.models.ProductSizes,
        as: "sizes",
        attributes: ["sizeId"],
        include: [
          {
            model: sequelize.models.Sizes,
            as: "size",
            attributes: ["name", "Id"],
          },
        ],
      },
      {
        model: sequelize.models.ProductColours,
        as: "colours",
        attributes: ["colorId"],
        include: [
          {
            model: sequelize.models.Colours,
            as: "colour",
            attributes: ["name", "Id"],
          },
          {
            model: sequelize.models.ProductColorImages,
            as: "images",
          },
        ],
      },
    ],
  });

  if (!product) {
    throw new DataNotFoundError("Product not exit");
  }

  return {
    Id: product.Id,
    title: product.title,
    price: product.price,
    finalPrice: product.final_price,
    name: product.name,
    SKU: product.SKU,
    status: product.status,
    description: product.description,
    status: product.status,
    categoryId: product.categoryId,
    stockQuantity: product.stockQuantity,
    finalPrice: product.finalPrice,
    stockStatus: product.stockStatus,
    subcategoryId: product.subcategoryId,
    sizes: product.sizes.map((item) => item.size) || [],
    colors: product.colours.map((color) => ({
      colorId: color.colour.Id,
      name: color.colour.name,
      images: color.images.map((img) => ({
        preview: `${BASE_IMAGE_URL}${img.imageUrl}`,
      })),
    })),
  };
};

module.exports = {
  createProductCtrl,
  getAllProdctCtrl,
  updateProductCtrl,
  getoneProductCtrl,
  deleteProductCtrl,
};
