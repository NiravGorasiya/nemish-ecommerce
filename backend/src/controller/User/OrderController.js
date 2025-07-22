const Razorpay = require("razorpay")
const { createModelItemQ, findModelItemsQ, findModelItemQ } = require("../../queries/generic")
const { convertQuery } = require("../../utils/paginationUtils")
const crypto = require("crypto");
const secret = process.env.RAZORPAY_KEY_SECRET

const createOrderCtrl = async (ctrlData) => {
    let orderData = {
        userId: ctrlData?.userId,
        orderDate: new Date(),
        ShippingMethodId: ctrlData?.ShippingMethodId,
        ShippingAddressId: ctrlData?.ShippingAddressId,
        status: 'pending',
        totalAmount: ctrlData?.totalAmount
    }
    const order = await createModelItemQ('Orders', orderData)

    for (const item of ctrlData.items) {
        const detailData = {
            orderId: order.Id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }
        await createModelItemQ('OrdersDetails', detailData)
    }
    return order;

}

const getUserOrderCtrl = async (queryData) => {
    const { offset, limit } = await convertQuery(queryData.page, queryData.limit)

    const carts = await findModelItemsQ('Orders', { userId: queryData.userId }, {
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
    })

    return carts;
}

const razorpay = require('../../utils/razorpay'); // Make sure this path is correct

const createUserOrderCtrl = async (ctrlData) => {
    try {
        const { amount } = ctrlData;

        if (!amount || isNaN(amount)) {
            throw new Error("Invalid amount received");
        }

        const options = {
            amount: Math.round(amount * 100), // convert to paisa and round
            currency: "INR",
            receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
        };


        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error("Failed to create Razorpay order:", JSON.stringify(error, null, 2));
    }
};


const createPaymentSuccessCtrl = async (ctrlData) => {
    try {
        const { signature, orderId, paymentId } = ctrlData;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");

        if (expectedSignature === signature) {
            return "Payment verified successfully.";
        } else {
            return "Payment verification failed.";
        }
    } catch (error) {
        console.error("Signature verification error:", error);
    }
};

module.exports = {
    createOrderCtrl,
    getUserOrderCtrl,
    createUserOrderCtrl,
    createPaymentSuccessCtrl
}