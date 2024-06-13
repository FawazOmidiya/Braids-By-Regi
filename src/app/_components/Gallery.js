import React from "react";
import "../_styles/Gallery.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Image from "next/image";
import BookBtn from "./BookBtn";
import GlobalAPI from "../utils/GlobalAPI";
import Styles from "./Styles";

const Gallery = () => {
  const [itemIndex, setItemIndex] = useState(0);
  const [category, setCategory] = useState([]);
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    slidesToShow: 5,
    centerMode: true,
    beforeChange: (current, next) => setItemIndex(next),
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    getSingleCategory();
  }, []);
  // Selecting a single category from the strapi backend which matches the key "Regina's Picks"
  const getSingleCategory = () => {
    GlobalAPI.getCategoryById(6).then((category) => {
      setCategory(category.data.data);
    });
  };
  return (
    <div className="galleryContainer">
      <h1 className="large-txt"> Popular Styles</h1>

      <Slider {...settings}>
        {category.attributes?.styles.data.map((item, index) => {
          return (
            <div
              key={index}
              className={index === itemIndex ? " slide  active " : "slide "}
            >
              <Styles option={item}></Styles>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Gallery;
