const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const {
  createResponse,
  successResponse,
  deleteResponce,
} = require("../../utils/sendResponse");

const { bannerV, getBannerV } = require("../../validators/banner");

const {
  createBannerCtrl,
  getBannerCtrl,
  updateBannerCtrl,
  getOneBannerCtrl,
  deleteBannerCtrl,
} = require("../../controller/Admin/Banner/Banner");
const upload = require("../../middlewares/upload");

router.post(
  "/add",
  upload.single("image"),
  bannerV,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });

      if (req.file) {
        ctrlData.image_url = `/uploads/${req.file.filename}`;
      }

      const banner = await createBannerCtrl(ctrlData);
      return createResponse(req, res, banner);
    } catch (error) {
      return next(error);
    }
  }
);

router.get("/all", getBannerV, expressValidatorMw, async (req, res, next) => {
  try {
    const query = matchedData(req, { locations: ["query"] });
    const banners = await getBannerCtrl(query);
    return successResponse(req, res, banners);
  } catch (error) {
    return next(error);
  }
});

router.put(
  "/update/:id",
  bannerV,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      ctrlData.bannerId = req.params.id;

      if (req.file) {
        ctrlData.image_url = `/uploads/${req.file.filename}`;
      }

      const updatedBanner = await updateBannerCtrl(ctrlData);
      return successResponse(req, res, updatedBanner);
    } catch (error) {
      return next(error);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const ctrlData = { bannerId: req.params.id };
    const banner = await getOneBannerCtrl(ctrlData);
    return successResponse(req, res, banner);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteBannerCtrl({ bannerId: req.params.id });
    return deleteResponce(req, res, "Banner deleted successfully.");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
