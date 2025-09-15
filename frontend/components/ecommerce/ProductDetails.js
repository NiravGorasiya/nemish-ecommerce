import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";

const ProductDetails = ({
  product,
  cartItems,
  addToCompare,
  addToCart,
  addToWishlist,
  quickView,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    Object.keys(product.colors)[0] 
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.name || null
  );
  const [activeImage, setActiveImage] = useState(
    product.colors[selectedColor][0]
  );

  const handleCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
      image: activeImage, 
    });
    toast.success("Added to Cart!");
  };

  const handleWishlist = () => {
    addToWishlist(product);
    toast.success("Added to Wishlist!");
  };

  const handleCompare = () => {
    addToCompare(product);
    toast.success("Added to Compare!");
  };

  return (
    <section className="mt-50 mb-50">
      <div className="container">
        <div className="row flex-row-reverse">
          <div className="col-lg-12">
            <div className="product-detail accordion-detail">
              <div className="row mb-50">
                <div className="col-md-6 col-sm-12">
                  <div className="detail-gallery">
                    <div className="product-image-slider">
                      <img
                        src={activeImage}
                        alt={product.title}
                        className="border rounded w-100"
                      />
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      {product.colors[selectedColor].map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`thumb-${i}`}
                          className={`border rounded cursor-pointer ${
                            activeImage === img ? "border-primary" : ""
                          }`}
                          style={{ width: 70, height: 70, objectFit: "cover" }}
                          onClick={() => setActiveImage(img)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12">
                  <div className="detail-info">
                    <h2 className="title-detail">{product.title}</h2>
                    <div className="clearfix product-price-cover mb-3">
                      <span className="text-brand h4">${product.price}</span>
                    </div>
                    <p>{product.description}</p>

                    <div className="mb-3">
                      <strong>Color: </strong>
                      <div className="d-flex gap-2 mt-2">
                        {Object.keys(product.colors).map((color, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedColor(color);
                              setActiveImage(product.colors[color][0]);
                            }}
                            className={`px-3 py-1 border rounded ${
                              selectedColor === color ? "bg-dark text-white" : ""
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <strong>Size: </strong>
                      <div className="d-flex gap-2 mt-2">
                        {product.sizes.map((s) => (
                          <button
                            key={s.Id}
                            onClick={() => setSelectedSize(s.name)}
                            className={`px-3 py-1 border rounded ${
                              selectedSize === s.name
                                ? "bg-dark text-white"
                                : ""
                            }`}
                          >
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-3">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setQuantity((q) => (q > 1 ? q - 1 : 1))
                        }
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="d-flex gap-3">
                      <button
                        className="btn btn-primary"
                        onClick={handleCart}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={handleWishlist}
                      >
                        ❤️ Wishlist
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleCompare}
                      >
                        🔄 Compare
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {!quickView && <ProductTab />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
