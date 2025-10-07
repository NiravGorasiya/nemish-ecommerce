const { createModelItemQ } = require("../../queries/generic");

const createReviewCtrl = async (ctrlData) => {
  const review = await createModelItemQ("Reviews", ctrlData);
  return review;
};

module.exports = {
  createReviewCtrl,
};
