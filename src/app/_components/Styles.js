import React from "react";
import "../_styles/Styles.css";
import BookBtn from "./BookBtn";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
function Styles({ option }) {
  return (
    <>
      <div className="flex flex-col">
        <div>
          <AspectRatio ratio={12 / 16}>
            <Image
              src={option.attributes.Image.data.attributes.url}
              style={{ objectFit: "cover" }}
              alt={option.attributes.Style}
              fill={true}
            ></Image>
          </AspectRatio>
        </div>
        <div className="">
          <p className="">
            <i className="fa-regular fa-clock"></i>&nbsp;
            {option.attributes.Duration / 60} hours &ensp;
            <i className="fa-solid fa-dollar-sign"></i>&nbsp;
            {option.attributes.Price}
          </p>
          <h1 className="">{option.attributes.Style}</h1>
          <BookBtn item={option}>Book</BookBtn>
        </div>
      </div>
    </>
  );
}

export default Styles;
