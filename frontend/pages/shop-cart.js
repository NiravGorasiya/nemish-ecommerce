import { connect } from "react-redux";
import Layout from "../components/layout/Layout";

import Link from "next/link";
import { clearCart, closeCart, decreaseQuantity, deleteFromCart, increaseQuantity, openCart } from "../redux/action/cart";
import { useDeleteCartItemMutation, useGetCartQuery, useUpdateCartItemMutation } from "../redux/reducer/cartSlice";
import { useRouter } from 'next/router';

const Cart = () => {
    const router = useRouter();
    const { data, error, loading, refetch } = useGetCartQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const [deleteCartItem] = useDeleteCartItemMutation()

    const [updateCartItem] = useUpdateCartItemMutation();

    const cartItem = data?.info?.rows

    const handleDecrement = async (item) => {
        if (Number(item.quantity)) {
            await updateCartItem({ Id: item.Id, quantity: item.quantity - 1 })
            await refetch()
        }
    }

    const handleIncrement = async (item) => {
        if (item.quantity) {
            await updateCartItem({ Id: item.Id, quantity: item.quantity + 1 })
            await refetch()
        }
    }

    const subTotal = cartItem?.reduce((acc, item) => {
        return acc + item.quantity * item?.Products?.finalPrice
    }, 0) || 0;

    const handleClick = (e) => {
        e.preventDefault();
        router.push('/shop-checkout');
    };

    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Cart">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    {cartItem && cartItem.length <= 0 && "No Products"}
                                    <table className={cartItem && cartItem.length > 0 ? "table shopping-summery text-center clean" : "d-none"}>
                                        <thead>
                                            <tr className="main-heading">
                                                <th scope="col">Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Subtotal</th>
                                                <th scope="col">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItem && cartItem.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="image product-thumbnail">
                                                        <img src={`http://localhost:3001/uploads/${item?.Products?.colours?.[0]?.images?.[0]?.imageUrl}`} />
                                                    </td>

                                                    <td className="product-des product-name">
                                                        <h5 className="product-name">
                                                            <Link href="/products">
                                                                <a>{item?.Products?.name}</a>
                                                            </Link>
                                                        </h5>
                                                        <p className="font-xs">
                                                            Maboriosam in a tonto nesciung eget
                                                            <br /> distingy magndapibus.
                                                        </p>
                                                    </td>
                                                    <td className="price" data-title="Price">
                                                        <span>${item?.Products?.finalPrice}</span>
                                                    </td>
                                                    <td className="text-center" data-title="Stock">
                                                        <div className="detail-qty border radius  m-auto">
                                                            <a onClick={(e) => handleDecrement(item)} className="qty-down">
                                                                <i className="fi-rs-angle-small-down"></i>
                                                            </a>
                                                            <span className="qty-val">{item.quantity}</span>
                                                            <a onClick={(e) => handleIncrement(item)} className="qty-up">
                                                                <i className="fi-rs-angle-small-up"></i>
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="text-right" data-title="Cart">
                                                        <span>${item.quantity * item?.Products?.finalPrice}</span>
                                                    </td>
                                                    <td className="action" data-title="Remove">
                                                        <a
                                                            onClick={async (e) => {
                                                                await deleteCartItem(item.Id); // wait for deletion
                                                                refetch(); // now get updated list
                                                            }}
                                                            className="text-muted"
                                                        >
                                                            <i className="fi-rs-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="6" className="text-end">
                                                    {cartItem && cartItem.length > 0 && (
                                                        <a onClick={clearCart} className="text-muted">
                                                            <i className="fi-rs-cross-small"></i>
                                                            Clear Cart
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="cart-action text-end">
                                    <a className="btn ">
                                        <i className="fi-rs-shopping-bag mr-10"></i>
                                        Continue Shopping
                                    </a>
                                </div>
                                <div className="divider center_icon mt-50 mb-50">
                                    <i className="fi-rs-fingerprint"></i>
                                </div>
                                <div className="row mb-50">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="heading_s1 mb-3">
                                            <h4>Calculate Shipping</h4>
                                        </div>
                                        <p className="mt-15 mb-30">
                                            Flat rate:
                                            <span className="font-xl text-brand fw-900">5%</span>
                                        </p>
                                        <form className="field_form shipping_calculator">
                                            <div className="form-row">
                                                <div className="form-group col-lg-12">
                                                    <div className="custom_select">

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row row">
                                                <div className="form-group col-lg-6">
                                                    <input required="required" placeholder="State / Country" name="name" type="text" />
                                                </div>
                                                <div className="form-group col-lg-6">
                                                    <input required="required" placeholder="PostCode / ZIP" name="name" type="text" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-lg-12">
                                                    <button className="btn  btn-sm">
                                                        <i className="fi-rs-shuffle mr-10"></i>
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="mb-30 mt-50">
                                            <div className="heading_s1 mb-3">
                                                <h4>Apply Coupon</h4>
                                            </div>
                                            <div className="total-amount">
                                                <div className="left">
                                                    <div className="coupon">
                                                        <form action="#" target="_blank">
                                                            <div className="form-row row justify-content-center">
                                                                <div className="form-group col-lg-6">
                                                                    <input className="font-medium" name="Coupon" placeholder="Enter Your Coupon" />
                                                                </div>
                                                                <div className="form-group col-lg-6">
                                                                    <button className="btn  btn-sm">
                                                                        <i className="fi-rs-label mr-10"></i>
                                                                        Apply
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <div className="border p-md-4 p-30 border-radius cart-totals">
                                            <div className="heading_s1 mb-3">
                                                <h4>Cart Totals</h4>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="cart_total_label">Cart Subtotal</td>
                                                            <td className="cart_total_amount">
                                                                {/* <span className="font-lg fw-900 text-brand">$ {price()}</span> */}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cart_total_label">Shipping</td>
                                                            <td className="cart_total_amount">
                                                                <i className="ti-gift mr-5"></i>
                                                                Free Shipping
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cart_total_label">Total</td>
                                                            <td className="cart_total_amount">
                                                                <strong>
                                                                    <span className="font-xl fw-900 text-brand">{subTotal}</span>
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <a href="#" className="btn" onClick={handleClick}>
                                                <i className="fi-rs-box-alt mr-10"></i>
                                                Proceed To CheckOut
                                            </a>
                                        </div>
                                    </div>
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
