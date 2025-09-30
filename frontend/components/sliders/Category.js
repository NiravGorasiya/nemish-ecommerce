import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { useGetCategoriesQuery } from "../../redux/reducer/categorySlice";

SwiperCore.use([Navigation]);

const CategorySlider = () => {
  const {data} = useGetCategoriesQuery();
  const categorys = data?.info?.rows;

  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        navigation={{
          prevEl: ".custom_prev_ct1",
          nextEl: ".custom_next_ct1",
        }}
        className="custom-class"
      >
        {categorys &&
          categorys?.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="card-1">
                <figure className=" img-hover-scale overflow-hidden">
                  <Link href="/products/shop-grid-right">
                    <a>
                      <img
                        src={`${process.env.NEXT_PUBLIC_UPLOAD_BANNER}${item.image}`}
                        alt=""
                      />
                    </a>
                  </Link>
                </figure>
                <h5>
                  <Link
                    href={{ pathname: "/products", query: { name: item.name } }}
                  >
                    <a>{item.name}</a>
                  </Link>
                </h5>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div
        className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
        id="carausel-6-columns-arrows"
      >
        <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
          <i className="fi-rs-angle-left"></i>
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_ct1">
          <i className="fi-rs-angle-right"></i>
        </span>
      </div>
    </>
  );
};

export default CategorySlider;
