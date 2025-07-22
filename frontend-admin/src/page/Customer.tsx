import React from 'react';
import Sidebar from '../layouts/commonComponent/Sidebar';
import Header from '../layouts/commonComponent/Header';
import { Row, Col, Button } from 'react-bootstrap';
import Footer from '../layouts/commonComponent/Footer';
import { useGetCustomerQuery } from '../redux/slice/customerSlice';

const Customer = () => {
    const { data, refetch } = useGetCustomerQuery()

    const customers = data?.info?.rows

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <section className="content-main">
                    <div className="content-header">
                        <div>
                            <h2 className="content-title card-title">Customer List</h2>
                            <p>Customer List.</p>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <header className="card-header">
                            <Row className=" align-items-center py-2">
                                <Col className="col-md-2 col-12 me-auto mb-md-0 mb-3">
                                    Email
                                </Col>
                                <Col className="col-md-2 col-6">
                                    Created
                                </Col>
                                <Col className="col-md-2 col-6">
                                    Updated
                                </Col>
                            </Row>
                        </header>
                        <div className="card-body">
                            {customers?.map((color, index) => (
                                <article className="itemlist">
                                    <Row key={index} className="align-items-center">
                                        <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                            <div className="info">
                                                <h6 className="mb-0">{color.email}</h6>
                                            </div>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-date">
                                            <span>{new Date(color.createdAt).toLocaleDateString()}</span>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-date">
                                            <span>{new Date(color.updatedAt).toLocaleDateString()}</span>
                                        </Col>
                                    </Row>
                                </article>
                            )
                            )}
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
                <Footer />
            </main>
        </>
    )
}

export default Customer