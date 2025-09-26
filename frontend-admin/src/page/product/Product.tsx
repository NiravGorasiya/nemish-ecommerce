import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Sidebar from "../../layouts/commonComponent/Sidebar";
import Header from "../../layouts/commonComponent/Header";
import Footer from "../../layouts/commonComponent/Footer";
import { useGetSubCategoryQuery } from "../../redux/slice/subCategory";
import {
  useCreateProductMutation,
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "../../redux/slice/productSlice";
import MultiSelected from "../../utils/MultiSelected";
import ColorImageGroupUploader from "../../utils/ColorImageGroupUploader";
import { useGetColourQuery } from "../../redux/slice/colorSlice";
import { useGetCategoriesQuery } from "../../redux/slice/categorySlice";

interface FormValues {
  name: string;
  title: string;
  stockStatus: string;
  description: string;
  price: number;
  stockQuantity: number;
  finalPrice: number;
  SKU: string;
  subcategoryId: string;
  categoryId: string;
  size_id: string[];
  colorImages: {
    colorId: string;
    images: {
      file: File;
      preview: string;
    }[];
  }[];
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at  least 3 character log"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive number")
    .required("Price is required"),
  finalPrice: Yup.number()
    .typeError("final price must be number")
    .positive("Final price must be a positive number")
    .required("Final price is required"),
  subcategoryId: Yup.string().required("select subcategory is required"),
  categoryId: Yup.string().required("select category is required"),
  stockStatus: Yup.string().required("Select stock status is required"),
});

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId: any = id ? parseInt(id, 10) : undefined;
  const { data: productDetail }: any = useGetProductDetailQuery(numericId);

  const isEditMode = Boolean(id);

  const { data } = useGetSubCategoryQuery({});
  const { data: category } = useGetCategoriesQuery();
  const { data: colorData } = useGetColourQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: "",
    title: "",
    description: "",
    price: 0,
    stockStatus: "",
    stockQuantity: 0,
    finalPrice: 0,
    subcategoryId: "",
    categoryId: "",
    SKU: "",
    size_id: [],
    colorImages: [],
  });

  const subcategoryData = data?.info;
  const categoryData = category?.info?.rows;
  const colorsDatas = colorData?.info?.rows;

  useEffect(() => {
    if (productDetail?.info) {
      const p = productDetail.info;
      console.log(p, " p ---");

      setInitialValues({
        name: p.name || "",
        title: p.title || "",
        description: p.description || "",
        price: p.price || 0,
        stockStatus: p.stockStatus || "",
        stockQuantity: p.stockQuantity || 0,
        finalPrice: p.finalPrice || 0,
        subcategoryId: p.subcategoryId || "",
        categoryId: p.categoryId || "",
        SKU: p.SKU || "",
        size_id: p.sizes || [],
        colorImages: p.colors || [],
      });
    }
  }, [productDetail]);

  const onsubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values.size_id, "values size_id");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("subcategoryId", values.subcategoryId);
    formData.append("price", values.price.toString());
    formData.append("finalPrice", values.finalPrice.toString());
    formData.append("stockQuantity", values.stockQuantity.toString());
    formData.append("categoryId", values.categoryId);
    formData.append("stockStatus", values.stockStatus);

    formData.append("size_id", JSON.stringify(values.size_id));

    values.colorImages.forEach(({ colorId, images }) => {
      images.forEach((imgObj) => {
        formData.append("color_id[]", colorId);
        formData.append("images", imgObj.file);
      });
    });

    try {
      if (isEditMode) {
        await updateProduct({ id: numericId, body: formData }).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }
    } catch (err: any) {
      if (err.status) {
        console.error("Server responded with error:", err.status, err.data);
      } else {
        console.error("Client/network error:", err.message);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onsubmit}
          >
            {({ isSubmitting, values, setFieldValue, errors }) => {
              return (
                <Form>
                  <div className="row">
                    <div className="col-12">
                      <div className="content-header d-flex justify-between items-center mb-4">
                        <h2 className="content-title">Add New Product</h2>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-light rounded font-sm mr-3 text-body hover-up"
                            disabled={isSubmitting}
                          >
                            Save to Draft
                          </button>
                          <button
                            type="submit"
                            className="btn btn-md rounded font-sm hover-up"
                          >
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-8">
                      <div className="card mb-4">
                        <div className="card-header">
                          <h4>Product Details</h4>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-4">
                                <label
                                  htmlFor="product_name"
                                  className="form-label"
                                >
                                  Product Name
                                </label>
                                <Field
                                  type="text"
                                  id="product_name"
                                  placeholder="Enter Product Name"
                                  name="name"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="error"
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="product_title"
                                  className="form-label"
                                >
                                  Product Title
                                </label>
                                <Field
                                  type="text"
                                  id="product_title"
                                  placeholder="Enter Product Title"
                                  name="title"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="error"
                                />
                              </div>

                              <div className="mb-4">
                                <label htmlFor="size_id" className="form-label">
                                  Size
                                </label>
                                <Field
                                  name="size_id"
                                  component={MultiSelected}
                                />
                                <ErrorMessage
                                  name="size_id"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="mb-4">
                                <label
                                  htmlFor="subcategory"
                                  className="form-label"
                                >
                                  Category
                                </label>
                                <Field
                                  as="select"
                                  name="categoryId"
                                  className="form-select"
                                >
                                  <option value="">Select Category</option>
                                  {categoryData?.map((category) => (
                                    <option
                                      key={category.Id}
                                      value={category.Id}
                                    >
                                      {category?.name}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name="categoryId"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="subcategory"
                                  className="form-label"
                                >
                                  Subcategory
                                </label>
                                <Field
                                  as="select"
                                  name="subcategoryId"
                                  className="form-select"
                                >
                                  <option value="">Select Subcategory</option>
                                  {subcategoryData?.map((subcategory) => (
                                    <option
                                      key={subcategory.Id}
                                      value={subcategory.Id}
                                    >
                                      {subcategory?.name}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name="subcategoryId"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="stockQuantity"
                                  className="form-label"
                                >
                                  Stock Quantity
                                </label>
                                <Field
                                  type="number"
                                  id="stockQuantity"
                                  placeholder="Enter Product Stock Quantity"
                                  name="stockQuantity"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="stockQuantity"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label htmlFor="description" className="form-label">
                              Full Description
                            </label>
                            <Field
                              as="textarea"
                              id="description"
                              placeholder="Enter Product Description"
                              name="description"
                              className="form-control"
                              rows={4}
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card">
                        <div className="card-header">
                          <h4>Price Details</h4>
                        </div>
                        <div className="p-3">
                          <div className="mb-4">
                            <label htmlFor="price" className="form-label">
                              Price
                            </label>
                            <Field
                              placeholder="₹"
                              name="price"
                              type="text"
                              id="price"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="error"
                            />
                          </div>

                          <div className="mb-4">
                            <label htmlFor="finalPrice" className="form-label">
                              Final Price
                            </label>
                            <Field
                              placeholder="₹"
                              name="finalPrice"
                              type="text"
                              id="finalPrice"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="finalPrice"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="stockStatus" className="form-label">
                              Stock Status
                            </label>
                            <Field
                              as="select"
                              name="stockStatus"
                              className="form-select"
                            >
                              <option value="">Select stock Status</option>
                              <option value="in_stock">In Stock</option>
                              <option value="out_of_stock">Out of Stock</option>
                            </Field>
                            <ErrorMessage
                              name="stockStatus"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 card">
                      <ColorImageGroupUploader
                        colorImages={values.colorImages}
                        setColorImages={(val) =>
                          setFieldValue("colorImages", val)
                        }
                        availableColors={
                          colorsDatas?.map((color) => ({
                            id: color.Id.toString(),
                            name: color.name,
                          })) || []
                        }
                      />
                    </div>
                    <div className="col-lg-6 card">
                      
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Product;
