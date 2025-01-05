import React from "react";
import Sidebar from "../commonComponent/Sidebar";
import Header from "../commonComponent/Header";

const productList = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header/>
                <section className="content-main">
                    <div className="content-header">
                        <div>
                            <h2 className="content-title card-title">Products List</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div>
                            <a href="#" className="btn btn-light rounded font-md mx-1">Export</a>
                            <a href="#" className="btn btn-light rounded font-md mx-1">Import</a>
                            <a href="#" className="btn btn-primary btn-sm rounded mx-1">Create new</a>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <header className="card-header">
                            <div className="row align-items-center">
                                <div className="col col-check flex-grow-0">
                                    <div className="form-check ms-2">
                                        <input className="form-check-input" type="checkbox" value="" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
                                    <select className="form-select">
                                        <option selected>All category</option>
                                        <option>Electronics</option>
                                        <option>Clothes</option>
                                        <option>Automobile</option>
                                    </select>
                                </div>
                                <div className="col-md-2 col-6">
                                    <input type="date" value="2022-12-24" className="form-control" />
                                </div>
                                <div className="col-md-2 col-6">
                                    <select className="form-select">
                                        <option selected>Status</option>
                                        <option>Active</option>
                                        <option>Disabled</option>
                                        <option>Show all</option>
                                    </select>
                                </div>
                            </div>
                        </header>
                        <div className="card-body">
                            <article className="itemlist">
                                <div className="row align-items-center">
                                    <div className="col col-check flex-grow-0">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                                        <a className="itemside" href="#">
                                            <div className="left">
                                                <img src="assets/imgs/items/1.jpg" className="img-sm img-thumbnail" alt="Item" />
                                            </div>
                                            <div className="info">
                                                <h6 className="mb-0">T-shirt for men medium size</h6>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-2 col-sm-2 col-4 col-price"> <span>$34.50</span> </div>
                                    <div className="col-lg-2 col-sm-2 col-4 col-status">
                                        <span className="badge rounded-pill alert-success">Active</span>
                                    </div>
                                    <div className="col-lg-1 col-sm-2 col-4 col-date">
                                        <span>02.11.2022</span>
                                    </div>
                                    <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                                        <a href="#" className="btn btn-sm font-sm rounded btn-brand mx-1">
                                            <i className="material-icons md-edit"></i> Edit
                                        </a>
                                        <a href="#" className="btn btn-sm font-sm btn-light rounded mx-1">
                                            <i className="material-icons md-delete_forever"></i> Delete
                                        </a>
                                    </div>
                                </div>
                            </article>
                            <article className="itemlist">
                                <div className="row align-items-center">
                                    <div className="col col-check flex-grow-0">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                                        <a className="itemside" href="#">
                                            <div className="left">
                                                <img src="assets/imgs/items/2.jpg" className="img-sm img-thumbnail" alt="Item" />
                                            </div>
                                            <div className="info">
                                                <h6 className="mb-0">Helionic Hooded Down Jacket</h6>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-2 col-sm-2 col-4 col-price"> <span>$990.99</span> </div>
                                    <div className="col-lg-2 col-sm-2 col-4 col-status">
                                        <span className="badge rounded-pill alert-success">Active</span>
                                    </div>
                                    <div className="col-lg-1 col-sm-2 col-4 col-date">
                                        <span>02.11.2022</span>
                                    </div>
                                    <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                                        <a href="#" className="btn btn-sm font-sm rounded btn-brand mx-1">
                                            <i className="material-icons md-edit"></i> Edit
                                        </a>
                                        <a href="#" className="btn btn-sm font-sm btn-light rounded mx-1">
                                            <i className="material-icons md-delete_forever"></i> Delete
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="pagination-area mt-30 mb-50">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-start">
                                <li className="page-item active"><a className="page-link" href="#">01</a></li>
                                <li className="page-item"><a className="page-link" href="#">02</a></li>
                                <li className="page-item"><a className="page-link" href="#">03</a></li>
                                <li className="page-item"><a className="page-link dot" href="#">...</a></li>
                                <li className="page-item"><a className="page-link" href="#">16</a></li>
                                <li className="page-item"><a className="page-link" href="#"><i className="material-icons md-chevron_right"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                </section>
                <footer className="main-footer font-xs">
                    <div className="row pb-30 pt-15">
                        <div className="col-sm-6">
                            <script>
                                document.write(new Date().getFullYear());
                            </script> 
                            &copy;, Evara - HTML Ecommerce Template .
                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end">
                                All rights reserved
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
};

export default productList;