import React, { useState, useEffect } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import Sidebar from "../../layouts/commonComponent/Sidebar";
import Header from "../../layouts/commonComponent/Header";
import Footer from "../../layouts/commonComponent/Footer";
import Gallery from "react-image-gallery";
import { useGetProductDetailQuery } from "../../redux/slice/productSlice";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const numericId: any = id ? parseInt(id, 10) : undefined;

  const { data }: any = useGetProductDetailQuery(numericId);
  const productDetails = data?.info;

  const getImageUrls = (images: any[]) =>
    images.map((img) => ({
      original: img.preview,
      thumbnail: img.preview,
    }));

  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [sliderImages, setSliderImages] = useState<any[]>([]);

  useEffect(() => {
    if (productDetails?.colors?.length > 0) {
      setSelectedColor(productDetails.colors[0]);
      setSliderImages(getImageUrls(productDetails.colors[0].images));
    }
  }, [productDetails]);

  const handleColorClick = (color: any): void => {
    setSelectedColor(color);
    setSliderImages(getImageUrls(color.images));
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title card-title">Product Details</h2>
          </div>

          <div className="container-fluid mt-4">
            <div className="row align-items-start">
              <div className="col-md-5">
                {sliderImages.length > 0 ? (
                  <Gallery items={sliderImages} />
                ) : (
                  <p>No images available</p>
                )}
              </div>

              <div className="col-md-6">
                <h2>{productDetails?.title}</h2>

                <div className="product-price mb-3">
                  <h4 className="text-success">₹{productDetails?.finalPrice}</h4>
                  {productDetails?.finalPrice !== productDetails?.price && (
                    <>
                      <h6 className="text-muted text-decoration-line-through">
                        ₹{productDetails?.price}
                      </h6>
                      <span className="badge bg-success">
                        {Math.round(
                          ((productDetails?.price - productDetails?.finalPrice) /
                            productDetails?.price) *
                            100
                        )}
                        % Off
                      </span>
                    </>
                  )}
                </div>

                <p>{productDetails?.description}</p>

                <div className="mb-3">
                  <strong>Size: </strong>
                  {productDetails?.sizes?.length > 0 ? (
                    productDetails.sizes.map((size: any, index: number) => (
                      <button
                        key={index}
                        className="btn btn-outline-primary btn-sm mx-1"
                      >
                        {size.name}
                      </button>
                    ))
                  ) : (
                    <span className="text-muted">No sizes available</span>
                  )}
                </div>

                <div className="mb-3">
                  <strong>Color: </strong>
                  {productDetails?.colors?.map((color: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleColorClick(color)}
                      className={`btn btn-outline-secondary btn-sm mx-1 ${
                        selectedColor?.name === color.name
                          ? "border border-dark"
                          : ""
                      }`}
                      style={{
                        backgroundColor: color.name.toLowerCase(),
                        color: "white",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                      }}
                      title={color.name}
                    ></button>
                  ))}
                </div>

                <div className="mb-3">
                  <strong>Stock: </strong>
                  <span
                    className={
                      productDetails?.stockStatus === "in_stock"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {productDetails?.stockStatus} ({productDetails?.stockQuantity} available)
                  </span>
                </div>

                <div className="mb-3">
                  <strong>SKU: </strong>
                  {productDetails?.SKU}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default ProductDetails;
