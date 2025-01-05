const sequelize = require("../../../models/sequelize")
const { createModelItemQ, findModelItemsQ } = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");

const createProductDetailsCtrl = async (ctrlData) => {
    const product = await createModelItemQ('Product_details', ctrlData)
    return product
}

const getAllProdctDetailsCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const [results] = await sequelize.query(
        `SELECT pd.*, p.Id AS productId, c.Id AS colorId, c.name AS colorName
         FROM Product_details pd
         LEFT JOIN Products p ON pd.product_id = p.Id
         LEFT JOIN Colours c ON pd.color_id = c.Id
         ORDER BY pd.createdAt DESC
         LIMIT :offset, :limit`, 
        {
            replacements: { offset, limit }, // Parameterized query to prevent SQL injection
            type: sequelize.QueryTypes.SELECT
        }
    );
    
    console.log('Raw query results:', results);
    

    // return productDetails;
}

module.exports = {
    createProductDetailsCtrl,
    getAllProdctDetailsCtrl
};
