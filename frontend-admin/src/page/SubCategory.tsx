import React, { useState } from 'react';
import Sidebar from '../layouts/commonComponent/Sidebar';
import Header from '../layouts/commonComponent/Header';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import Footer from '../layouts/commonComponent/Footer';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import { subcategory, useCreateSubCategoryMutation, useDeleteSubCategoryMutation, useGetSubCategoryQuery, useUpdateSubCategoryMutation } from '../redux/slice/subCategory';
import * as Yup from 'yup';
import { useGetCategoriesQuery, useUpdateCategoryMutation } from '../redux/slice/categorySlice';

interface FormValues {
    name: string;
    category_id: string
}

export interface category {
    Id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at  least 3 character log'),
    category_id: Yup.string()
        .required('Category  is required')
})


const SubCategory: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false)
    const [name, setName] = useState('')
    const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
    const [deleteSubCategory] = useDeleteSubCategoryMutation();
    const [createSubCategory] = useCreateSubCategoryMutation()
    const [updateSubCategory] = useUpdateSubCategoryMutation();
    const [limit, setLimit] = useState(10);
    const { data, refetch } = useGetSubCategoryQuery({ page: currentPage, limit });
    const { data: category } = useGetCategoriesQuery()
    const [categoryId, setCategoryId] = useState<string>("")

    const categorys = category?.info?.rows

    const subCategorys = data?.info

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        await deleteSubCategory(id)
        refetch()
    }

    const initialValues: FormValues = {
        name:  subCategoryId ? name : '',
        category_id: categoryId ? String(categoryId) : ''
    }

    const handleEdit = (subCategory: { Id: number, name: string, Categories: category }) => {
        setCategoryId(String(subCategory?.Categories.Id))
        setName(subCategory.name);
        setSubCategoryId(subCategory.Id);
        setPopupVisible(true);
    }

    const handleButtonClick = () => {
        setPopupVisible(!isPopupVisible)
    }

    const onSubmit = (values: FormValues) => {
        if (subCategoryId) {
            updateSubCategory({ Id: subCategoryId, ...values })
        } else {
            createSubCategory(values)
        }
        setPopupVisible(false)
    }

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <section className="content-main">
                    <div className="content-header">
                        <div>
                            <h2 className="content-title card-title">Sub Category List</h2>
                            <p>Product sub category List.</p>
                        </div>
                        <div>
                            <Button onClick={handleButtonClick} className="btn btn-primary btn-sm rounded mx-1">Create new</Button>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <header className="card-header">
                            <Row className=" align-items-center py-2">
                                <Col className="col-md-2 col-12 me-auto mb-md-0 mb-3">
                                    Name
                                </Col>
                                <Col className="col-md-2 col-12 me-auto mb-md-0 mb-3">
                                    Category
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
                            {subCategorys?.map((category: subcategory, index) => {
                                console.log(category, 'category');

                                return (
                                    <article className="itemlist">
                                        <Row key={index} className="align-items-center">
                                            <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                                <div className="info">
                                                    <h6 className="mb-0">{category.name}</h6>
                                                </div>
                                            </Col>
                                            <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                                                <div className="info">
                                                    <h6 className="mb-0">{category.Categories.name}</h6>
                                                </div>
                                            </Col>
                                            <Col lg={2} sm={2} xs={4} className="col-date">
                                                <span>{new Date(category.createdAt).toLocaleDateString()}</span>
                                            </Col>
                                            <Col lg={2} sm={2} xs={4} className="col-date">
                                                <span>{new Date(category.updatedAt).toLocaleDateString()}</span>
                                            </Col>
                                            <Col lg={2} sm={2} xs={4} className="col-action text-end">
                                                <Button
                                                    variant='brand'
                                                    size="sm"
                                                    className='font-sm rounded mx-1'
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    <i className="material-icons md-edit"></i> Edit
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    className="font-sm rounded mx-1"
                                                    onClick={(event) => handleDelete(event, category.Id)}
                                                >
                                                    <i className="material-icons md-delete_forever"></i> Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </article>
                                )
                            })}
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Modal.Header>
                                    <Modal.Title>{subCategoryId ? 'Edit subcategory' : 'Add Sub category'}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <Field type="text" id="name" name="name" placeholder="Enter name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className='error'></ErrorMessage>
                                    </div>
                                    <div>
                                        <label className="form-label">Category</label>
                                        <Field as="select" name="category_id" className="form-select">
                                            <option value="">Select Category</option>
                                            {categorys?.map((category) => (
                                                <option value={category.Id}> {category.name} </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name='category_id' component="div" className='error'></ErrorMessage>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='secondary' onClick={handleButtonClick}>
                                        Close
                                    </Button>
                                    <Button variant='secondary' type="submit" disabled={isSubmitting}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            </main>
        </>
    );
};

export default SubCategory;
