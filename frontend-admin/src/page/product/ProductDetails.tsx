import React, { useState, useEffect } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import Sidebar from "../../layouts/commonComponent/Sidebar";
import Header from "../../layouts/commonComponent/Header";
import Footer from "../../layouts/commonComponent/Footer";
import Gallery from "react-image-gallery";
import { useGetProductDetailQuery } from "../../redux/slice/productSlice";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const { data }: any = useGetProductDetailQuery(id as string);
    const productDetails = data?.info;

    const getImageUrls = (images: string[]) =>
        images.map((img) => ({
            original: img,
            thumbnail: img,
            description: "Image",
        }));

    const [selectedColor, setSelectedColor] = useState<string>("");
    const [sliderImages, setSliderImages] = useState<any[]>([]);

    useEffect(() => {
        if (productDetails?.colors) {
            const defaultColor = Object.keys(productDetails.colors)[0];
            setSelectedColor(defaultColor);
            const images = getImageUrls(productDetails.colors[defaultColor]);
            setSliderImages(images);
        }
    }, [productDetails]);

    const handleColorClick = (color: string): void => {
        setSelectedColor(color);
        const images = getImageUrls(productDetails.colors[color] || []);
        setSliderImages(images);
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

                    <div className="container-fulild mt-4">
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
                                    <h4 className="text-success">₹{productDetails?.price}</h4>
                                    <h6 className="text-muted text-decoration-line-through">₹{productDetails?.oldPrice}</h6>
                                    <span className="badge bg-success">{productDetails?.discount}% Off</span>
                                </div>

                                <p>{productDetails?.description}</p>

                                <div className="mb-3">
                                    <strong>Size: </strong>
                                    {productDetails?.sizes.map((size: any, index: number) => (
                                        <button key={index} className="btn btn-outline-primary btn-sm mx-1">
                                            {size.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="mb-3">
                                    <strong>Color: </strong>
                                    {productDetails &&
                                        Object.keys(productDetails.colors).map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleColorClick(color)}
                                                className={`btn btn-outline-secondary btn-sm mx-1 ${selectedColor === color ? "border border-dark" : ""}`}
                                                style={{
                                                    backgroundColor: color,
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "30px",
                                                    height: "30px",
                                                }}
                                            ></button>
                                        ))}
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
