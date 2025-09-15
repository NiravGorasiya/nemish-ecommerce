const {
  createModelItemQ,
  findModelItemsQ,
  findModelItemQ,
} = require("../../queries/generic");
const { convertQuery } = require("../../utils/paginationUtils");
const sequelize = require("../../models/sequelize");
const { DataNotFoundError } = require("../../errors");
const BASE_IMAGE_URL = "http://localhost:5000/uploads/";


const getUserProductCtrl = async (queryData) => {
  const { offset, limit } = await convertQuery(queryData.page, queryData.limit);
  const userProduct = await findModelItemsQ(
    "Products",
    {},
    {
      offset,
      limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: sequelize.models.ProductColours,
          as: "colours",
          attributes: ["colorId"],
          required: false,
          include: [
            {
              model: sequelize.models.Colours,
              as: "colour",
              attributes: ["name", "Id"],
              required: false,
            },
            {
              model: sequelize.models.ProductColorImages,
              as: "images",
              required: false,
            },
          ],
        },
      ],
      raw: false,
    },
    true
  );

  return userProduct;
};

const getUserProductDetailCtrl = async (queryData) => {
  const product = await findModelItemQ("Products", {
    where: {
      id: queryData,
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
    description: product.description,
    status: product.status,
    sizes: product.sizes.map((item) => item.size) || [],
    colors: product.colours.reduce((acc, color) => {
      acc[color.colour.name.toLowerCase()] = color.images.map(
        (item) => `${BASE_IMAGE_URL}${item.imageUrl}`
      );
      return acc;
    }, {}),
  };
};

module.exports = {
  getUserProductCtrl,
  getUserProductDetailCtrl,
};
