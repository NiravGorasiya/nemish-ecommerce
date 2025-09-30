const { findModelItemsQ } = require("../../queries/generic");

const categoryAllCtrl = async () => {
  const categories = await findModelItemsQ(
    "Categories",
    {},
    {
      order: [["createdAt", "DESC"]],
      raw: true,
    }
  );
  return categories;
};

module.exports = {
  categoryAllCtrl,
};
