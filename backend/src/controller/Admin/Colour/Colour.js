const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");
const { DataNotFoundError } = require("../../../errors");

// Create a Colour
const createColourCtrl = async (ctrlData) => {
    const colour = await createModelItemQ('Colours', ctrlData);
    return colour;
};

// Get all Colours with Pagination
const getColoursCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit);

    const colours = await findModelItemsQ('Colours',{}, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC'] 
        ],
        raw: true
    });

    return colours;
};

// Update a Colour
const updateColourCtrl = async (ctrlData) => {
    const colour = await findModelItemQ('Colours', { where: { id: ctrlData.colourId } });
    if (colour) {
        await colour.update({ ...ctrlData });
        const updatedColour = await findModelItemQ('Colours', { where: { id: ctrlData.colourId }, raw: true });
        return updatedColour;
    } else {
        throw new DataNotFoundError('Colour not found');
    }
};

// Delete a Colour
const deleteColourCtrl = async (ctrlData) => {
    const colour = await findModelItemQ('Colours', {
        where: {
            id: ctrlData.colourId
        }
    });
    if (colour) {
        const destroyedColour = await colour.destroy();
        return destroyedColour;
    } else {
        throw new DataNotFoundError('The requested resource does not exist');
    }
};

// Get one Colour by ID
const getOneColourCtrl = async (ctrlData) => {
    const colour = await findModelItemQ('colours', {
        where: {
            id: ctrlData.colourId
        }
    });
    if (!colour) {
        throw new DataNotFoundError('Colour does not exist');
    }
    return colour;
};

module.exports = {
    createColourCtrl,
    getColoursCtrl,
    updateColourCtrl,
    deleteColourCtrl,
    getOneColourCtrl
};
