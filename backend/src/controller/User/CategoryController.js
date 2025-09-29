const { findModelItemsQ } = require("../../queries/generic");

const categoryCtrl = async () => {
  const category = await findModelItemsQ(
    "Category",
    {},
    { offset, limit, order: [["createdAt", "DESC"]], raw: true }
  );
  return category;
};

module.exports = {
  categoryCtrl,
};
