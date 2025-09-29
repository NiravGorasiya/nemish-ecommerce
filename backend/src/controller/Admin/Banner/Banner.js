const {
  createModelItemQ,
  findModelItemsQ,
  findModelItemQ,
} = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");
const { DataNotFoundError } = require("../../../errors");


const createBannerCtrl = async (ctrlData) => {
  const banner = await createModelItemQ("Banners", ctrlData);
  return banner;
};

const getBannerCtrl = async (queryData) => {
  const { offset, limit } = await convertQuery(
    queryData.page,
    queryData.limit
  );

  const banners = await findModelItemsQ(
    "Banners",
    {},
    {
      offset,
      limit,
      order: [["createdAt", "DESC"]],
      raw: true,
    }
  );

  return banners;
};

const updateBannerCtrl = async (ctrlData) => {
  const banner = await findModelItemQ("Banners", {
    where: { id: ctrlData.bannerId },
  });

  if (!banner) {
    throw new DataNotFoundError("Banner not found");
  }

  await banner.update({ ...ctrlData });

  const updatedBanner = await findModelItemQ("Banners", {
    where: { id: ctrlData.bannerId },
    raw: true,
  });

  return updatedBanner;
};

const deleteBannerCtrl = async (ctrlData) => {
  const banner = await findModelItemQ("Banners", {
    where: { id: ctrlData.bannerId },
  });

  if (!banner) {
    throw new DataNotFoundError("Banner not found");
  }

  await banner.destroy();
  return true;
};

const getOneBannerCtrl = async (ctrlData) => {
  const banner = await findModelItemQ("Banners", {
    where: { id: ctrlData.bannerId },
    raw: true,
  });

  if (!banner) {
    throw new DataNotFoundError("Banner not found");
  }

  return banner;
};

module.exports = {
  createBannerCtrl,
  getBannerCtrl,
  updateBannerCtrl,
  deleteBannerCtrl,
  getOneBannerCtrl,
};
