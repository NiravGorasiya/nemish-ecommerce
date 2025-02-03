import React from 'react';
import Sidebar from '../../layouts/commonComponent/Sidebar';
import Header from '../../layouts/commonComponent/Header';
import { useDeleteCategoryMutation } from '../../redux/slice/categorySlice';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Footer from '../../layouts/commonComponent/Footer';
import { useGetProductQuery } from '../../redux/slice/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const { data } = useGetProductQuery();
    const navigate = useNavigate();

    const [deleteCategory] = useDeleteCategoryMutation();
    const categorys = data?.info?.rows

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        await deleteCategory(id)
    }

    const handleEdit = (category: { Id: number, name: string }) => {

    }

    const handleButtonClick = () => {
        navigate("/productadd")
    }

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <section className="content-main">
                    <div className="content-header">
                        <div>
                            <h2 className="content-title card-title">Category List</h2>
                            <p>Product List.</p>
                        </div>
                        <div>
                            <Button onClick={handleButtonClick} className="btn btn-primary btn-sm rounded mx-1">Create new</Button>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <header className="card-header">
                            <Row className=" align-items-center py-2">
                                <div className="col col-check flex-grow-0">
                                    <div className="form-check ms-2">
                                        <input className="form-check-input" type="checkbox" value="" />
                                    </div>
                                </div>
                                <Col className="col-md-3 col-12 me-auto mb-md-0 mb-3">
                                    Product name
                                </Col>
                                <Col className="col-md-2 col-6">
                                    Created
                                </Col>
                                <Col className="col-md-2 col-6">
                                    Updated
                                </Col>
                                <Col className="col-md-2 col-6">
                                    Actions
                                </Col>
                            </Row>
                        </header>
                        <div className="card-body">
                            {categorys?.map((product, index) => (
                                <article className="itemlist">
                                    <Row key={index} className="align-items-center">
                                        <Col xs={1}>
                                            <Form.Check type="checkbox" />
                                        </Col>
                                        <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                            <div className="info">
                                                <h6 className="mb-0">{product.name}</h6>
                                            </div>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-date">
                                            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-date">
                                            <span>{new Date(product.updatedAt).toLocaleDateString()}</span>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-action text-end">
                                            <Button
                                                variant='brand'
                                                size="sm"
                                                className='font-sm rounded mx-1'
                                                onClick={() => navigate(`/product/detail/${product?.Id}`)}
                                            >
                                                <i className="material-icons md-edit"></i> view
                                            </Button>
                                            <Button
                                                variant='brand'
                                                size="sm"
                                                className='font-sm rounded mx-1'
                                                onClick={() => handleEdit(product)}
                                            >
                                                <i className="material-icons md-edit"></i> Edit
                                            </Button>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="font-sm rounded mx-1"
                                                onClick={(event) => handleDelete(event, product.Id)}
                                            >
                                                <i className="material-icons md-delete_forever"></i> Delete
                                            </Button>
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
    );
}

export default ProductList