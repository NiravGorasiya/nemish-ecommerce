const { findModelItemsQ, findModelItemQ } = require("../../queries/generic");

const getAllSubCategoryAllCtrl = async (query) => {
  let subcategories = await findModelItemsQ("SubCategories", {}, { raw: true });
  if (query.name) {
    const category = await findModelItemQ("Categories", {
      where: { name: query.name },
      raw: true,
    });

    subcategories = await findModelItemsQ("SubCategories", {
      categoryId: category.Id,
    });
  }

  return subcategories;
};

module.exports = {
  getAllSubCategoryAllCtrl,
};
