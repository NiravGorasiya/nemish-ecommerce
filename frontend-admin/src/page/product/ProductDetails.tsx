import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from '../../layouts/commonComponent/Sidebar'
import Header from '../../layouts/commonComponent/Header'
import Footer from '../../layouts/commonComponent/Footer'
import Slider from "react-slick";


interface Product {
    title: string;
    price: number;
    oldPrice: number;
    discount: number;
    sizes: string[];
    colors: Record<string, string[]>;
    description: string;
}

const ProductDetails = () => {

    const product: Product = {
        title: "GoSriki Women's Rayon Blend Printed Anarkali Kurta with Pant & Dupatta",
        price: 799,
        oldPrice: 2599,
        discount: 69,
        sizes: ["M", "L", "XL", "XXL"],
        colors: {
            red: [
                "https://images.meesho.com/images/products/476348771/cz65d_512.webp",
                "https://images.meesho.com/images/products/476348771/other_red_512.webp",
            ],
            green: [
                "https://images.meesho.com/images/products/476348775/dhlq9_512.webp",
                "https://images.meesho.com/images/products/476348775/pye8o_512.webp",
            ],
            blue: [
                "https://images.meesho.com/images/products/476348773/9ia9k_512.webp",
                "https://images.meesho.com/images/products/476348773/sssy6_512.webp",
            ],
        },
        description:
            "This is a rayon blend printed Anarkali Kurta, perfect for festive occasions.",
    };

    const [sliderImages, setSliderImages] = useState<string[]>(product.colors.red);
    const [selectedColor, setSelectedColor] = useState<string>("red");


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        customPaging: (i: number) => (
            
            <img
                src={sliderImages[i]}
                alt={`Dot ${i}`}
                style={{
                    width: "300px !important",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginBottom:"5px",
                    border: "1px solid #ddd",
                }}
            />
        ),
        dotsClass: "slick-dots slick-thumb",
    };

    const handleColorClick = (color: string): void => {
        setSelectedColor(color);
        setSliderImages(product.colors[color]);
    };

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <section className="content-main">
                    <div className="content-header">
                        <div>
                            <h2 className="content-title card-title">Product Details</h2>
                            <p>Product Details.</p>
                        </div>
                    </div>

                    <div className="container mt-4">
                        <div className="row align-items-start">
                            {/* Left: Image Slider */}
                            <div className="col-md-4 ms-md-5">
                                <Slider {...sliderSettings}>
                                    {sliderImages.map((image, index) => (
                                        <div key={index}>
                                            <img
                                                src={image}
                                                alt={`Product ${index}`}
                                                className="img-fluid"
                                                style={{ maxHeight: "400px",maxWidth:"300px", objectFit: "contain" }}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            {/* Right: Product Details */}
                            <div className="col-md-7">
                                <h2>{product.title}</h2>
                                <div className="product-price mb-3">
                                    <h4 className="text-success">₹{product.price}</h4>
                                    <h6 className="text-muted text-decoration-line-through">₹{product.oldPrice}</h6>
                                    <span className="badge bg-success">{product.discount}% Off</span>
                                </div>

                                <p>{product.description}</p>

                                {/* Size Options */}
                                <div className="mb-3">
                                    <strong>Size: </strong>
                                    {product.sizes.map((size, index) => (
                                        <button
                                            key={index}
                                            className="btn btn-outline-primary btn-sm mx-1"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                                {/* Color Options */}
                                <div className="mb-3">
                                    <strong>Color: </strong>
                                    {Object.keys(product.colors).map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleColorClick(color)}
                                            className={`btn btn-outline-secondary btn-sm mx-1 ${selectedColor === color ? "active" : ""
                                                }`}
                                            style={{
                                                backgroundColor: color,
                                                color: "white",
                                                borderRadius: "50%",
                                                width: "30px",
                                                height: "30px",
                                                border: selectedColor === color ? "2px solid black" : "",
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
    )
}

export default ProductDetails