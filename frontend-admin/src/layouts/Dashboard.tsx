import React from 'react';
import Sidebar from './commonComponent/Sidebar';
import Header from './commonComponent/Header';

const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header/>
                <section className="content-main">
                    <div className="content-header">
                        <div>
                            <h2 className="content-title card-title">Dashboard</h2>
                            <p>Whole data about your business here</p>
                        </div>
                        <div>
                            <a href="#" className="btn btn-primary">
                                <i className="text-muted material-icons md-post_add"></i>Create report
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card card-body mb-4">
                                <article className="icontext">
                                    <span className="icon icon-sm rounded-circle bg-primary-light">
                                        <i className="text-primary material-icons md-monetization_on"></i>
                                    </span>
                                    <div className="text">
                                        <h6 className="mb-1 card-title">Revenue</h6>
                                        <span>$13,456.5</span>
                                        <span className="text-sm">Shipping fees are not included</span>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="card card-body mb-4">
                                <article className="icontext">
                                    <span className="icon icon-sm rounded-circle bg-success-light">
                                        <i className="text-success material-icons md-local_shipping"></i>
                                    </span>
                                    <div className="text">
                                        <h6 className="mb-1 card-title">Orders</h6>
                                        <span>53,668</span>
                                        <span className="text-sm">Excluding orders in transit</span>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="card card-body mb-4">
                                <article className="icontext">
                                    <span className="icon icon-sm rounded-circle bg-warning-light">
                                        <i className="text-warning material-icons md-qr_code"></i>
                                    </span>
                                    <div className="text">
                                        <h6 className="mb-1 card-title">Products</h6>
                                        <span>9,856</span>
                                        <span className="text-sm">In 19 Categories</span>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="card card-body mb-4">
                                <article className="icontext">
                                    <span className="icon icon-sm rounded-circle bg-info-light">
                                        <i className="text-info material-icons md-shopping_basket"></i>
                                    </span>
                                    <div className="text">
                                        <h6 className="mb-1 card-title">Monthly Earning</h6>
                                        <span>$6,982</span>
                                        <span className="text-sm">Based in your local time</span>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>

                    {/* Add other sections similarly */}

                </section>

                <footer className="main-footer font-xs">
                    <div className="row pb-30 pt-15">
                        <div className="col-sm-6">
                            {new Date().getFullYear()} &copy;, Evara - HTML Ecommerce Template
                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end">All rights reserved</div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
};

export default Dashboard;
