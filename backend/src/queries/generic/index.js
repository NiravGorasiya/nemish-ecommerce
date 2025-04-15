const sequelize = require('../../models/sequelize')
const findModelItemQ = (modelName,queryOpts)=>{
    const options = { ...queryOpts, raw: queryOpts?.raw ?? false }; 
    return sequelize.models[modelName].findOne(options);
}

const findModelItemsQ = async (modelName, where = {}, options = {}, count = true) => {
    const finalOptions = {
        where,
        ...options,
        raw: options?.raw ?? false
    };

    const model = sequelize.models[modelName];

    return count
        ? await model.findAndCountAll(finalOptions)
        : await model.findAll(finalOptions);
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