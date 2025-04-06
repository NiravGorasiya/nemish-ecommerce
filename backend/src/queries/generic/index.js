const sequelize = require('../../models/sequelize')
const findModelItemQ = (modelName,queryOpts)=>{
    const options = { ...queryOpts, raw: queryOpts?.raw ?? false }; 
    return sequelize.models[modelName].findOne(options);
}

const findModelItemsQ = async (modelName, queryOpts, count = true, scope = null) => {
    const options = { ...queryOpts, raw: queryOpts?.raw ?? false }; // Add raw option to queryOpts
    if (count) {
        const result = await sequelize.models[modelName].findAndCountAll(options);
        return result; // Returns { count, rows }
    } else {
        const result = await sequelize.models[modelName].findAll(options);
        return result; // Returns array of rows
    }
};


const findModelItemsWithScopeQ = (modelName,queryOpts,count=true,scope=null)=>{
    let result = null
    if(count){
         result = sequelize.models[modelName].scope(scope).findAndCountAll(queryOpts)
    }else{
        result = sequelize.models[modelName].scope(scope).findAll(queryOpts)
    } 
    return result 
}

const createModelItemQ = async(modelName,queryData,queryOptions={})=>{
    const modelItem = await sequelize.models[modelName].create(queryData,queryOptions)
    return modelItem.dataValues;
}

const findOrCreateModelItemQ = async(modelName,queryData)=>{
    const modelItem = await sequelize.models[modelName].findOrCreate(queryData)
    return modelItem
}

const updateModelItemQ = async (modelName, valueData, queryData) => {
    const updatedModelItem = await sequelize.models[modelName].update(
        { ...valueData }, 
        { where: { ...queryData } } 
    );
    return updatedModelItem;
};

module.exports = {
    findModelItemQ,
    findModelItemsQ,
    createModelItemQ,
    findOrCreateModelItemQ,
    updateModelItemQ,
    findModelItemsWithScopeQ,
}