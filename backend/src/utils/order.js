// controllers/order.js
const { findModelItemsQ } = require("../queries/generic");

const getNextOrderNumber = async() => {
  try {
    const lastOrders =await findModelItemsQ(
      "Orders",
      {},
      { order: [["createdAt", "DESC"]] },
      false
    );
    const lastOrder = lastOrders[0];
    return lastOrder ? lastOrder.orderNo + 1 : 100001;
    
  } catch (error) {
  }
};

module.exports = { getNextOrderNumber };
