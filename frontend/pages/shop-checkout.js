"use client";

import { connect } from "react-redux";
import Layout from "../components/layout/Layout";

import {
  clearCart,
  closeCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
  openCart,
} from "../redux/action/cart";
import { useGetCartQuery } from "../redux/reducer/cartSlice";
import {
  useAddPlaceOrderMutation,
  useCreateOrderMutation,
  usePaymentSuccessMutation,
} from "../redux/reducer/orderSlice";

const Cart = () => {
  const { data, error, loading, refetch } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const cartItem = data?.info?.rows;

  const [addPlaceOrder] = useAddPlaceOrderMutation();
  const [createOrder] = useCreateOrderMutation();
  const [paymentSuccess] = usePaymentSuccessMutation();

  const subTotal =
    cartItem?.reduce((acc, item) => {
      return acc + item.quantity * item?.Products?.finalPrice;
    }, 0) || 0;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const carDeatils = cartItem.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.Products.finalPrice,
    }));

    const orderItem = {
      items: carDeatils,
      ShippingAddressId: 1,
      ShippingMethodId: 1,
      totalAmount: subTotal,
    };

    await addPlaceOrder(orderItem);

    const orderResponse = await createOrder({ amount: subTotal }).unwrap();

    const options = {
      key: "rzp_test_RFUEjeFoaGM6cf",
      amount: subTotal * 100,
      currency: orderResponse.info.currency,
      name: "your company name",
      description: "payment for order",
      order_id: orderResponse.info?.id,
      handler: async function (response) {
        try {
          await paymentSuccess({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          }).unwrap();
          alert("Payment Verified Successfullyabc!");
        } catch (error) {
          alert("Payment verification failed okddd!");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild="Checkout">
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="mb-25">
                  <h4>Billing Details</h4>
                </div>
                <form method="post">
                  <div className="form-group">
                    <input
                      type="text"
                      required=""
                      name="fname"
                      placeholder="First name *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="billing_address"
                      required=""
                      placeholder="Address *"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="zipcode"
                      placeholder="Postcode / ZIP *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="phone"
                      placeholder="Phone *"
                    />
                  </div>
                  <div className="form-group">
                    <div className="checkbox">
                      <div className="custome-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkbox"
                          id="createaccount"
                        />
                        <label
                          className="form-check-label label_info"
                          data-bs-toggle="collapse"
                          data-target="#collapsePassword"
                          aria-controls="collapsePassword"
                          htmlFor="createaccount"
                        >
                          <span>Create an account?</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    id="collapsePassword"
                    className="form-group create-account collapse in"
                  >
                    <input
                      required=""
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <div className="ship_detail">
                    <div className="form-group">
                      <div className="chek-form">
                        <div className="custome-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="differentaddress"
                          />
                          <label
                            className="form-check-label label_info"
                            data-bs-toggle="collapse"
                            data-target="#collapseAddress"
                            aria-controls="collapseAddress"
                            htmlFor="differentaddress"
                          >
                            <span>Ship to a different address?</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      id="collapseAddress"
                      className="different_address collapse in"
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="fname"
                          placeholder="First name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="lname"
                          placeholder="Last name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="cname"
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address"
                          required=""
                          placeholder="Address *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address2"
                          required=""
                          placeholder="Address line2"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="city"
                          placeholder="City / Town *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="state"
                          placeholder="State / County *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="zipcode"
                          placeholder="Postcode / ZIP *"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-20">
                    <h5>Additional information</h5>
                  </div>
                  <div className="form-group mb-30">
                    <textarea rows="5" placeholder="Order notes"></textarea>
                  </div>
                </form>
              </div>
              <div className="col-md-3">
                <form method="post">
                  <div className="form-group mt-45">
                    <input
                      type="text"
                      required=""
                      name="fname"
                      placeholder="last name *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="billing_address2"
                      required=""
                      placeholder="Address line2"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="city"
                      placeholder="City / Town *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="email"
                      placeholder="Email address *"
                    />
                  </div>
                  <div
                    id="collapsePassword"
                    className="form-group create-account collapse in"
                  >
                    <input
                      required=""
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <div className="ship_detail">
                    <div
                      id="collapseAddress"
                      className="different_address collapse in"
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="fname"
                          placeholder="First name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="lname"
                          placeholder="Last name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="cname"
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address"
                          required=""
                          placeholder="Address *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address2"
                          required=""
                          placeholder="Address line2"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="city"
                          placeholder="City / Town *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="state"
                          placeholder="State / County *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="zipcode"
                          placeholder="Postcode / ZIP *"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <div className="order_review">
                  <div className="mb-20">
                    <h4>Your Orders</h4>
                  </div>
                  <div className="table-responsive order_table text-center">
                    {cartItem && cartItem.length <= 0 && "No Products"}
                    <table
                      className={
                        cartItem && cartItem.length > 0 ? "table" : "d-none"
                      }
                    >
                      <thead>
                        <tr>
                          <th colSpan="2">Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItem &&
                          cartItem.map((item, i) => (
                            <tr key={i}>
                              <td className="image product-thumbnail">
                                <img
                                  src={`http://localhost:5000/uploads/${item?.Products?.colours?.[0]?.images?.[0]?.imageUrl}`}
                                />
                              </td>
                              <td>
                                <h5>
                                  <a>{item?.Products?.name}</a>
                                </h5>{" "}
                                <span className="product-qty">
                                  x {item.quantity}
                                </span>
                              </td>
                              <td>
                                ${item.quantity * item?.Products?.finalPrice}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <th>SubTotal</th>
                          <td className="product-subtotal" colSpan="2">
                            ${subTotal}
                          </td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td colSpan="2">
                            <em>Free Shipping</em>
                          </td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td colSpan="2" className="product-subtotal">
                            <span className="font-xl text-brand fw-900">
                              ${subTotal}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                  <div className="payment_method">
                    <div className="mb-25">
                      <h5>Payment</h5>
                    </div>
                    <div className="payment_option">
                      <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios3"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios3"
                          data-bs-toggle="collapse"
                          data-target="#bankTranfer"
                          aria-controls="bankTranfer"
                        >
                          Direct Bank Transfer
                        </label>
                        <div
                          className="form-group collapse in"
                          id="bankTranfer"
                        >
                          <p className="text-muted mt-5">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            alteration.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios4"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios4"
                          data-bs-toggle="collapse"
                          data-target="#checkPayment"
                          aria-controls="checkPayment"
                        >
                          Check Payment
                        </label>
                        <div
                          className="form-group collapse in"
                          id="checkPayment"
                        >
                          <p className="text-muted mt-5">
                            Please send your cheque to Store Name, Store Street,
                            Store Town, Store State / County, Store Postcode.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios5"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios5"
                          data-bs-toggle="collapse"
                          data-target="#paypal"
                          aria-controls="paypal"
                        >
                          Paypal
                        </label>
                        <div className="form-group collapse in" id="paypal">
                          <p className="text-muted mt-5">
                            Pay via PayPal; you can pay with your credit card if
                            you don't have a PayPal account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="btn btn-fill-out btn-block mt-30"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Cart;
