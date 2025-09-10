import React from "react";
import Sidebar from "../../layouts/commonComponent/Sidebar";
import Header from "../../layouts/commonComponent/Header";
import Footer from "../../layouts/commonComponent/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetSubCategoryQuery } from "../../redux/slice/subCategory";
import { useCreateProductMutation } from "../../redux/slice/productSlice";
import MultiSelected from "../../utils/MultiSelected";
import ColorImageGroupUploader from "../../utils/ColorImageGroupUploader";
import { useGetColourQuery } from "../../redux/slice/colorSlice";

interface FormValues {
  name: string;
  title: string;
  description: string;
  price: number;
  finalPrice: number;
  status: string;
  SKU: string;
  subcategoryId: string;
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
  status: Yup.string().required("status is required"),
  subcategoryId: Yup.string().required("select subcategory is required"),
  SKU: Yup.string().required("SKU is required"),
});

const Product: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    title: "",
    description: "",
    price: 0,
    finalPrice: 0,
    subcategoryId: "",
    status: "",
    SKU: "",
    size_id: [],
    colorImages: [],
  };

  const { data } = useGetSubCategoryQuery({});
  const { data: colorData } = useGetColourQuery();

  const [createProduct] = useCreateProductMutation();
  const subcategoryData = data?.info;
  const colorsDatas = colorData?.info?.rows;

  const onsubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("subcategoryId", values.subcategoryId);
    formData.append("price", values.price.toString());
    formData.append("finalPrice", values.finalPrice.toString());
    formData.append("status", values.status);
    formData.append("SKU", values.SKU);

    values.size_id.forEach((sizeId) => {
      formData.append("size_id[]", sizeId);
    });

    values.colorImages.forEach(({ colorId, images }) => {
      images.forEach((imgObj) => {
        formData.append("color_id[]", colorId); 
        formData.append("images", imgObj.file); 
      });
    });
    try {
      const response = await createProduct(formData).unwrap();
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onsubmit}
          >
            {({ isSubmitting, values, setFieldValue, errors }) => {
              return (
                <div>
                  <div className="row">
                    <Form>
                      <div className="col-9">
                        <div className="content-header">
                          <h2 className="content-title">Add New Product</h2>
                          <div>
                            <button
                              type="submit"
                              className="btn btn-light rounded font-sm mr-5 text-body hover-up"
                              disabled={isSubmitting}
                            >
                              Save to draft
                            </button>
                            <button className="btn btn-md rounded font-sm hover-up">
                              Publich
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="card mb-4">
                          <div className="card-header">
                            <h4>Product</h4>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <label
                                  htmlFor="product_name"
                                  className="form-label"
                                >
                                  Product name
                                </label>
                                <Field
                                  type="text"
                                  id="name"
                                  placeholder="Enter product name"
                                  name="name"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="col-md-6 mb-4">
                                <label
                                  htmlFor="product_subcategory"
                                  className="form-label"
                                >
                                  Subcategory
                                </label>
                                <Field
                                  as="select"
                                  name="subcategoryId"
                                  className="form-select"
                                >
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
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <label
                                  htmlFor="product_title"
                                  className="form-label"
                                >
                                  Product title
                                </label>
                                <Field
                                  type="text"
                                  id="title"
                                  placeholder="Enter product title"
                                  name="title"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="col-md-6 mb-4">
                                <label htmlFor="sku" className="form-label">
                                  SKU
                                </label>
                                <Field
                                  type="text"
                                  id="sku"
                                  placeholder="Enter product SKU"
                                  name="SKU"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="SKU"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <label
                                  htmlFor="description"
                                  className="form-label"
                                >
                                  Full description
                                </label>
                                <Field
                                  as="textarea"
                                  placeholder="Enter product description"
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
                              <div className="col-md-6 mb-4">
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
                            <div className="row">
                              <div className="col-md-4 mb-4">
                                <label className="form-label">Price</label>
                                <Field
                                  placeholder="₹"
                                  name="price"
                                  type="text"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="price"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="col-md-4 mb-4">
                                <label className="form-label">
                                  Final price
                                </label>
                                <Field
                                  placeholder="₹"
                                  name="finalPrice"
                                  type="text"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="finalPrice"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="col-md-4 mb-4">
                                <label className="form-label">Status</label>
                                <Field
                                  as="select"
                                  name="status"
                                  className="form-select"
                                >
                                  <option value="active"> Active </option>
                                  <option value="inactive"> Inactive </option>
                                </Field>
                              </div>
                            </div>
                          </div>
                        </div>
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
                    </Form>
                  </div>
                </div>
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
