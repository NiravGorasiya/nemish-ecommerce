import React, { useState } from 'react';
import Sidebar from '../layouts/commonComponent/Sidebar';
import Header from '../layouts/commonComponent/Header';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import Footer from '../layouts/commonComponent/Footer';
import { useCreateColourMutation, useDeleteColourMutation, useGetColourQuery, useUpdateColourMutation } from '../redux/slice/colorSlice';

const Color = () => {
    const { data } = useGetColourQuery();
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false)
    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [deleteCategory] = useDeleteColourMutation();
    const [createCategory] = useCreateColourMutation()
    const [updateCategory] = useUpdateColourMutation()
    const colours = data?.info?.rows

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        await deleteCategory(id)
    }

    const handleEdit = (category: { Id: number, name: string }) => {
        setName(category.name);
        setCategoryId(category.Id);
        setPopupVisible(true);
    }

    const handleButtonClick = () => {
        setPopupVisible(!isPopupVisible)
    }

    const handleSubmit = async () => {
        if (categoryId) {
            await updateCategory({ Id: categoryId, name });
        } else {
            await createCategory({ name });
        }
        setPopupVisible(false);
    }

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <section className="content-main">
                    <div className="content-header">
                        <div>
                            <h2 className="content-title card-title">Color List</h2>
                            <p>Color List.</p>
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
                                <Col className="col-md-2 col-12 me-auto mb-md-0 mb-3">
                                    Name
                                </Col>
                                <Col className="col-md-2 col-12 me-auto mb-md-0 mb-3">
                                    Hex code
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
                            {colours?.map((color, index) => (
                                <article className="itemlist">
                                    <Row key={index} className="align-items-center">
                                        <Col xs={1}>
                                            <Form.Check type="checkbox" />
                                        </Col>
                                        <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                            <div className="info">
                                                <h6 className="mb-0">{color.name}</h6>
                                            </div>
                                        </Col>
                                        <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                            <div className="info">
                                                <h6 className="mb-0">{color.hex_code}</h6>
                                            </div>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-date">
                                            <span>{new Date(color.createdAt).toLocaleDateString()}</span>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-date">
                                            <span>{new Date(color.updatedAt).toLocaleDateString()}</span>
                                        </Col>
                                        <Col lg={2} sm={2} xs={4} className="col-action text-end">
                                            <Button
                                                variant='brand'
                                                size="sm"
                                                className='font-sm rounded mx-1'
                                                onClick={() => handleEdit(color)}
                                            >
                                                <i className="material-icons md-edit"></i> Edit
                                            </Button>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="font-sm rounded mx-1"
                                                onClick={(event) => handleDelete(event, color.Id)}
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
                <Modal show={isPopupVisible} onHide={handleButtonClick}>
                    <Modal.Header>
                        <Modal.Title>{categoryId ? 'Edit Category' : 'Add Category'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='formName'>
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                >

                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleButtonClick}>
                            Close
                        </Button>
                        <Button variant='secondary' onClick={handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </main>
        </>
    )
}

export default Color