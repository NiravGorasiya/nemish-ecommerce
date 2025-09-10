const { 
    createModelItemQ, 
    findModelItemsQ, 
    findModelItemQ 
} = require("../../../queries/generic");
const { convertQuery } = require("../../../utils/paginationUtils");
const { DataNotFoundError } = require("../../../errors");

const createCouponCtrl = async (ctrlData) => {
    const coupon = await createModelItemQ("Coupons", ctrlData);
    return coupon;
};

const getCouponsCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit);

    const coupons = await findModelItemsQ(
        "Coupons",
        {},
        {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            raw: true,
        }
    );

    return coupons;
};

const updateCouponCtrl = async (ctrlData) => {
    const coupon = await findModelItemQ("Coupons", { where: { id: ctrlData.couponId } });
    if (coupon) {
        await coupon.update({ ...ctrlData });
        const updatedCoupon = await findModelItemQ("Coupons", {
            where: { id: ctrlData.couponId },
            raw: true,
        });
        return updatedCoupon;
    } else {
        throw new DataNotFoundError("Coupon not found");
    }
};

const deleteCouponCtrl = async (ctrlData) => {
    const coupon = await findModelItemQ("Coupons", {
        where: { id: ctrlData.couponId },
    });
    if (coupon) {
        const destroyedCoupon = await coupon.destroy();
        return destroyedCoupon;
    } else {
        throw new DataNotFoundError("The requested resource does not exist");
    }
};

const getOneCouponCtrl = async (ctrlData) => {
    const coupon = await findModelItemQ("Coupons", {
        where: { id: ctrlData.couponId },
        raw: true,
    });
    if (!coupon) {
        throw new DataNotFoundError("Coupon does not exist");
    }
    return coupon;
};

module.exports = {
    createCouponCtrl,
    getCouponsCtrl,
    updateCouponCtrl,
    deleteCouponCtrl,
    getOneCouponCtrl,
};
