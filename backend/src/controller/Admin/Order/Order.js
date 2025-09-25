const sequelize = require("../../../models/sequelize");
const { findModelItemsQ, findModelItemQ } = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");

const getOrderCtrl = async (queryData) => {
  const { offset, limit } = await convertQuery(queryData.page, queryData.limit);

  const order = await findModelItemsQ(
    "Orders",
    {},
    {
      offset,
      limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: sequelize.models.Users,
          as: "Users",
        },
      ],
    }
  );
  return order;
};

const getOrderDetailsCtrl = async (ctrlData) => {
  const order = await findModelItemQ("Orders", {
  where: { id: ctrlData.orderId },
  include: [
    {
      model: sequelize.models.Users,
      as: "Users",
    },
    {
      model: sequelize.models.OrdersDetails,
      as: "orderDetails"
    },
  ],
});
  return order;
};

module.exports = {
  getOrderCtrl,
  getOrderDetailsCtrl,
};
