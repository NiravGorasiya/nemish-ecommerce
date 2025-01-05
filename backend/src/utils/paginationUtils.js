const convertQuery = async (page, limit) => {
    let offset;
    if (!page && limit) {
        offset = 0;
    }

    if (!limit && page) {
        offset = null;
        limit = null;
    }

    if (limit && page) {
        offset = (limit * page) - limit;
    }

    return {
        offset: offset ? parseInt(offset) : null,
        limit: limit ? parseInt(limit) : null
    }
}

module.exports = { convertQuery }