import { useState } from "react";
import { toast } from "react-toastify";
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

  const bootstrapColorMap = {
    red: "danger",
    blue: "primary",
    green: "success",
    yellow: "warning",
    gray: "secondary",
  };

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
                        style={{ height: 600 }}
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
                        <div className="d-flex gap-2 mt-2">
                          {Object.keys(product.colors).map((color, i) => {
                            const bootstrapColor =
                              bootstrapColorMap[color] || "secondary";

                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedColor(color);
                                  setActiveImage(product.colors[color][0]);
                                }}
                                className={`px-3 py-1 border rounded ${
                                  selectedColor === color
                                    ? `bg-${bootstrapColor} text-white`
                                    : ""
                                }`}
                              >
                                {color}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* <div className="attr-detail attr-color mb-15">
                        <strong className="mr-10">Color</strong>
                        <ul className="list-filter color-filter">
                          {product.variations.map((clr, i) => (
                            <li key={i}>
                              <a href="#">
                                <span className={`product-color-${clr}`}></span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div> */}
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
                        onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
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
                        className="button button-add-to-cart"
                        onClick={handleCart}
                      >
                        Add to Cart
                      </button>
                      <a
                        aria-label="Add To Wishlist"
                        className="action-btn hover-up"
                        onClick={(e) => handleWishlist(product)}
                      >
                        <i className="fi-rs-heart"></i>
                      </a>
                      <button
                        className="action-btn hover-up"
                        onClick={handleWishlist}
                      >
                        Wishlist
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleCompare}
                      >
                        Compare
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
