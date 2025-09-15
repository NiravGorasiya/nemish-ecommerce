import React from "react";
import axios from "axios";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from "../../components/layout/Layout";
import { server } from "../../config/index";
import { findProductIndex } from "../../util/util";
import { useGetProductByIdQuery } from "../../redux/reducer/productSlice";

const ProductId = ({ product }) => {
  return (
    <>
      <Layout parent="Home" sub="Shop" subChild={product.title}>
        <div className="container">
          <ProductDetails product={product} />
        </div>
      </Layout>
    </>
  );
};

ProductId.getInitialProps = async (params) => {
  const { id } = params.query;

  try {
    const productData = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/userproduct/${id}`
    );

    return { product: productData.data.info };
  } catch (error) {}
};

export default ProductId;
