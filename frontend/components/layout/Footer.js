import React, { useState } from "react";
import Link from "next/link";
import { useAddSubscribeMutation } from "../../redux/reducer/subScribeSlice";
import { toast } from "react-toastify";

const Footer = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const [addSubscribe] = useAddSubscribeMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await addSubscribe(user);

      if (response?.data?.message) {
        toast.success(response.data.message);
      } else {
        toast.success("Subscribed successfully!");
      }

      setUser({ email: "" });
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <footer className="main">
        <section className="newsletter p-30 mt-30 text-white wow fadeIn animated">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 mb-md-3 mb-lg-0">
                <div className="row align-items-center">
                  <div className="col flex-horizontal-center">
                    <img
                      className="icon-email"
                      src="/assets/imgs/theme/icons/icon-email.svg"
                      alt=""
                    />
                    <h4 className="font-size-20 mb-0 ml-3">
                      Sign up to Newsletter
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <form
                  className="form-subcriber d-flex wow fadeIn animated"
                  onSubmit={handleSubscribe}
                >
                  <input
                    type="email"
                    className="form-control bg-white font-small"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleInputChange}
                  />
                  <button className="btn bg-dark text-white" type="submit">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding footer-mid">
          <div className="container pt-15 pb-20">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <div className="widget-about font-md mb-md-5 mb-lg-0">
                  <div className="logo logo-width-1 wow fadeIn animated">
                    <Link href="/">
                      <a>
                        <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                      </a>
                    </Link>
                  </div>
                  <h5 className="mt-20 mb-10 fw-600 text-grey-4 wow fadeIn animated">
                    Contact
                  </h5>
                  <p className="wow fadeIn animated">
                    <strong>Address: </strong>A-201 RadheShyam Residency near
                    marutidham society
                  </p>
                  <p className="wow fadeIn animated">
                    <strong>Phone: </strong>+91 7069224753
                  </p>
                  <p className="wow fadeIn animated">
                    <strong>Hours: </strong>10:00 - 18:00, Mon - Sat
                  </p>
                  <h5 className="mb-10 mt-30 fw-600 text-grey-4 wow fadeIn animated">
                    Follow Us
                  </h5>
                  <div className="mobile-social-icon wow fadeIn animated mb-sm-5 mb-md-0">
                    <a href="#">
                      <img
                        src="/assets/imgs/theme/icons/icon-facebook.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="/assets/imgs/theme/icons/icon-twitter.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="/assets/imgs/theme/icons/icon-instagram.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="/assets/imgs/theme/icons/icon-pinterest.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="/assets/imgs/theme/icons/icon-youtube.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3">
                <h5 className="widget-title wow fadeIn animated">About</h5>
                <ul className="footer-list wow fadeIn animated mb-sm-5 mb-md-0">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Delivery Information</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4">
                <h5 className="widget-title wow fadeIn animated">My Account</h5>
                <ul className="footer-list wow fadeIn animated">
                  <li>
                    <a href="#">Sign In</a>
                  </li>
                  <li>
                    <a href="#">View Cart</a>
                  </li>
                  <li>
                    <a href="#">My Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Track My Order</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">Order</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="container pb-20 wow fadeIn animated">
          <div className="row">
            <div className="col-12 mb-20">
              <div className="footer-bottom"></div>
            </div>
            <div className="col-lg-6">
              <p className="float-md-left font-sm text-muted mb-0">
                &copy; {new Date().getFullYear()},
                <strong className="text-brand"> Evara</strong> - React Redux
                Nextjs Ecommerce Template
              </p>
            </div>
            <div className="col-lg-6">
              <p className="text-lg-end text-start font-sm text-muted mb-0">
                Designed by
                <a href="http://alithemes.com" target="_blank">
                  {" "}
                  Alithemes.com
                </a>
                . All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
