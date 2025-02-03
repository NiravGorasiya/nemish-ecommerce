import React from 'react';
import Sidebar from '../../layouts/commonComponent/Sidebar';
import Header from '../../layouts/commonComponent/Header';
import Footer from '../../layouts/commonComponent/Footer';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useGetSubCategoryQuery } from '../../redux/slice/subCategory';

type ProductColorImage = {
    color_id: string;
    images: string[];
};

interface FormValues {
    name: string,
    title: string,
    description: string,
    price: number,
    final_price: number,
    status: string,
    SKU: string,
    productColorImages: ProductColorImage[];
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at  least 3 character log'),
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required'),
    price: Yup.number()
        .typeError('Price must be a number')
        .positive("Price must be positive number")
        .required("Price is required"),
    final_price: Yup.number()
        .typeError("final price must be number")
        .positive("Final price must be a positive number")
        .required("Final price is required"),
    status: Yup.string()
        .required("status is required"),
    subcategory_id: Yup.string()
        .required("select subcategory is required"),
    SKU: Yup.string()
        .required("SKU is required")
})

const Product: React.FC = () => {
    const initialValues: FormValues = {
        name: '',
        title: '',
        description: '',
        price: 0,
        final_price: 0,
        status: '',
        SKU: '',
        productColorImages: [
            { color_id: '', images: [''] },
        ],
    }

    const { data } = useGetSubCategoryQuery();
    const subcategoryData = data?.info;

    const onsubmit = (values: FormValues) => {
        console.log(values, 'vallue');
    }

    const sizeData = [
        { Id: '1', name: 'Small' },
        { Id: '2', name: 'Medium' },
        { Id: '3', name: 'Large' },
    ];

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <section className="content-main">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onsubmit}
                    >
                        {({ isSubmitting,values }) => (
                            <div>
                                <div className="row">
                                    <Form>
                                        <div className="col-9">
                                            <div className="content-header">
                                                <h2 className="content-title">Add New Product</h2>
                                                <div>
                                                    <button type="submit" className="btn btn-light rounded font-sm mr-5 text-body hover-up" disabled={isSubmitting}>Save to draft</button>
                                                    <button className="btn btn-md rounded font-sm hover-up">Publich</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <h4>Product</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-4">
                                                        <label htmlFor="product_name" className="form-label">Product name</label>
                                                        <Field type="text" id="name" placeholder="Enter product name" name="name" className="form-control"></Field>
                                                        <ErrorMessage name="name" component="div" className='error'></ErrorMessage>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="product_subcategory" className="form-label">Subcategory</label>
                                                        <Field as="select" name="subcategory_id" className="form-select">
                                                            {subcategoryData?.map((subcatgory) => (
                                                                <option value={subcatgory.Id}> {subcatgory?.name} </option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="subcategory_id" component="div" className='error'></ErrorMessage>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="product_title" className="form-label">Product title</label>
                                                        <Field type="text" id="title" placeholder="Enter product title" name="title" className="form-control"></Field>
                                                        <ErrorMessage name="title" component="div" className='error'></ErrorMessage>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="description" className="form-label">Full description</label>
                                                        <Field placeholder="Enter product description" name="description" className="form-control" rows={4}></Field>
                                                        <ErrorMessage name="description" component="div" className='error'></ErrorMessage>
                                                    </div>
                                                    <div className='mb-4'>
                                                        <label htmlFor='size_id' className='form-label'>Size</label>
                                                        <Field
                                                            as="select"
                                                            name="size_id"
                                                            multiple
                                                            className="form-select"
                                                        >
                                                            {sizeData?.map((size) => (
                                                                <option key={size.Id} value={size.Id}>{size.name}</option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                    <div>
                                                        <label>Product Color Images</label>
                                                        <FieldArray
                                                            name="productColorImages"
                                                            render={(arrayHelpers) => (
                                                                <div>
                                                                    {values?.productColorImages.map((color, index) => (
                                                                        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                                                                            <div>
                                                                                <label>Color ID</label>
                                                                                <Field
                                                                                    name={`productColorImages.${index}.color_id`}
                                                                                    placeholder="Enter Color ID"
                                                                                />
                                                                            </div>
                                                                            <FieldArray
                                                                                name={`productColorImages.${index}.images`}
                                                                                render={(imageHelpers) => (
                                                                                    <div>
                                                                                        {color.images.map((img, imgIndex) => (
                                                                                            <div key={imgIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                                                <Field
                                                                                                    name={`productColorImages.${index}.images.${imgIndex}`}
                                                                                                    placeholder="Enter Image URL"
                                                                                                />
                                                                                                <button
                                                                                                    type="button"
                                                                                                    onClick={() => imageHelpers.remove(imgIndex)}
                                                                                                    style={{ color: 'red' }}
                                                                                                >
                                                                                                    Remove Image
                                                                                                </button>
                                                                                            </div>
                                                                                        ))}
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => imageHelpers.push('')}
                                                                                            style={{ marginTop: '10px' }}
                                                                                        >
                                                                                            Add Image
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                style={{ color: 'red', marginTop: '10px' }}
                                                                            >
                                                                                Remove Color
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.push({ color_id: '', images: [''] })}
                                                                        style={{ marginTop: '20px' }}
                                                                    >
                                                                        Add Color
                                                                    </button>
                                                                </div>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="sku" className="form-label">SKU</label>
                                                        <Field type="text" id="sku" placeholder="Enter product SKU" name="SKU" className="form-control"></Field>
                                                        <ErrorMessage name="SKU" component="div" className='error'></ErrorMessage>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <div className="mb-4">
                                                                <label className="form-label">Price</label>
                                                                <Field placeholder="₹" name="price" type="text" className="form-control" ></Field>
                                                                <ErrorMessage name="price" component="div" className='error' />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="mb-4">
                                                                <label className="form-label">Final price</label>
                                                                <Field placeholder="₹" name="final_price" type="text" className="form-control" />
                                                                <ErrorMessage name="final_price" component="div" className='error' />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label className="form-label">status</label>
                                                            <Field as="select" name="status" className="form-select">
                                                                <option value="active"> Active </option>
                                                                <option value="inactive"> Inactive </option>
                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        )}
                    </Formik>
                </section>
                <Footer />
            </main>
        </>
    )
}

export default Product