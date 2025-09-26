import React from 'react';
import Sidebar from '../../layouts/commonComponent/Sidebar';
import Header from '../../layouts/commonComponent/Header';
import { Row, Col, Button } from 'react-bootstrap';
import Footer from '../../layouts/commonComponent/Footer';
import { useDeleteProductMutation, useGetProductQuery } from '../../redux/slice/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const { data, refetch } = useGetProductQuery();
    const navigate = useNavigate();
    const [deleteProduct] = useDeleteProductMutation();

    const products = data?.info?.rows

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        await deleteProduct(id)
        refetch()
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
                            <h2 className="content-title card-title">Product List</h2>
                            <p>Product List.</p>
                        </div>
                        <div>
                            <Button onClick={handleButtonClick} className="btn btn-primary btn-sm rounded mx-1">Create new</Button>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <header className="card-header">
                            <Row className="align-items-center py-2">
                                 <Col lg={2} sm={4} xs={8} className="me-auto mb-md-0 mb-3 text-center">
                                    SKU
                                </Col>
                                <Col lg={2} sm={4} xs={8} className="me-auto mb-md-0 mb-3">
                                    Product name
                                </Col>
                                <Col lg={2} sm={2} xs={4}>
                                    Price
                                </Col>
                                <Col lg={1} sm={2} xs={4}>
                                    status
                                </Col>
                                <Col lg={2} sm={2} xs={4}>
                                    Actions
                                </Col>
                            </Row>
                        </header>
                        <div className="card-body">
                            {products?.map((product: any, index: number) => (
                                <article className="itemlist">
                                    <Row key={index} className="align-items-center">
                                        <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                            <h6 className="mb-0">{product.SKU}</h6>
                                        </Col>
                                        <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                            <h6 className="mb-0">{product.name}</h6>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-date">
                                            <span>{product.final_price}</span>
                                        </Col>
                                        <Col lg={1} sm={2} xs={4} className="col-date">
                                            <span>{product.status}</span>
                                        </Col>
                                        <Col lg={3} sm={2} xs={4} className="col-action text-end">
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
                                                onClick={() => navigate(`/product/edit/${product?.Id}`)}
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