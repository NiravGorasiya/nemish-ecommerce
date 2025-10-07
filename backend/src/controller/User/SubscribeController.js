const { createModelItemQ, findModelItemQ } = require("../../queries/generic");

const createSubScribeCtrl = async (ctrlData) => {
  const subscribe = await createModelItemQ("SubScribe", ctrlData);
  return subscribe;
};

module.exports = {
  createSubScribeCtrl,
};
