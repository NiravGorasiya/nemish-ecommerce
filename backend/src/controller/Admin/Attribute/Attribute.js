const {
  createModelItemQ,
  findModelItemsQ,
  findModelItemQ,
} = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");
const { DataNotFoundError } = require("../../../errors");

const createAttributeCtrl = async (ctrlData) => {
  const attribute = await createModelItemQ("Attributes", ctrlData);
  return attribute;
};

const getAttributeCtrl = async (queryData) => {
  const { offset, limit } = await convertQuery(queryData.page, queryData.limit);

  const attribute = await findModelItemsQ(
    "Attributes",
    {},
    {
      offset,
      limit,
      order: [["createdAt", "DESC"]],
      raw: true,
    }
  );

  return attribute;
};

const updateAttributeCtrl = async (ctrlData) => {
  const attribute = await findModelItemQ("Attributes", {
    where: { id: ctrlData.attributeId },
  });
  if (attribute) {
    await attribute.update({ ...ctrlData });
    const attributeData = await findModelItemQ("Attributes", {
      where: { id: ctrlData.attributeId },
      raw: true,
    });
    return attributeData;
  } else {
    throw new DataNotFoundError();
  }
};

const deleteAttributeCtrl = async (ctrlData) => {
  const attribute = await findModelItemQ("Attributes", {
    where: {
      id: ctrlData.attributeId,
    },
  });
  if (attribute) {
    const destroyedattributes = await attribute.destroy();
    return destroyedattributes;
  } else {
    throw new DataNotFoundError("The requested resource does not exist");
  }
};

const getoneAttributeCtrl = async (ctrlData) => {
  const attribute = await findModelItemQ("Attributes", {
    where: {
      id: ctrlData.attributeId,
    },
  });
  if (!attribute) {
    throw new DataNotFoundError("attribute not exit");
  }
  return attribute;
};

module.exports = {
  createAttributeCtrl,
  getAttributeCtrl,
  updateAttributeCtrl,
  deleteAttributeCtrl,
  getoneAttributeCtrl,
};
