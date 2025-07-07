const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");
const { DataNotFoundError } = require("../../../errors");

// Create a Size
const createSizeCtrl = async (ctrlData) => {
    const size = await createModelItemQ('Sizes', ctrlData);
    return size;
};

// Get all Sizes with Pagination
const getSizesCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit);

    const sizes = await findModelItemsQ('Sizes',{}, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC'] // Order by most recently created
        ],
        raw: true
    });

    return sizes;
};

// Update a Size
const updateSizeCtrl = async (ctrlData) => {
    const size = await findModelItemQ('Sizes', { where: { id: ctrlData.sizeId } });
    if (size) {
        await size.update({ ...ctrlData });
        const updatedSize = await findModelItemQ('Sizes', { where: { id: ctrlData.sizeId }, raw: true });
        return updatedSize;
    } else {
        throw new DataNotFoundError('Size not found');
    }
};

// Delete a Size
const deleteSizeCtrl = async (ctrlData) => {
    const size = await findModelItemQ('Sizes', {
        where: {
            id: ctrlData.sizeId
        }
    });
    if (size) {
        const destroyedSize = await size.destroy();
        return destroyedSize;
    } else {
        throw new DataNotFoundError('The requested resource does not exist');
    }
};

// Get one Size by ID
const getOneSizeCtrl = async (ctrlData) => {
    const size = await findModelItemQ('Sizes', {
        where: {
            id: ctrlData.sizeId
        }
    });
    if (!size) {
        throw new DataNotFoundError('Size does not exist');
    }
    return size;
};

module.exports = {
    createSizeCtrl,
    getSizesCtrl,
    updateSizeCtrl,
    deleteSizeCtrl,
    getOneSizeCtrl
};
