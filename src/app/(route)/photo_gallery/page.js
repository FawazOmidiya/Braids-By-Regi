"use client";
import React from "react";
import Navbar from "../../_components/Navbar";
import Image from "next/image";
import "../../_styles/photogal.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
function page() {
  return (
    <>
      <Navbar></Navbar>

      <div className="justify-center">
        <h1>BBR Photo Gallery</h1>
        <div className="grid grid-cols-2 grid-rows-4 w-6/6 p-12 gap-y-4 bg-blue-500 m-auto">
          <div>
            <AspectRatio>
              <Image
                src="/badgal.png"
                style={{ objectFit: "cover" }}
                fill={true}
              ></Image>
            </AspectRatio>
          </div>
          <div className=" border box-2">2</div>
          <div className=" col-span-2 border">3</div>
          <div className=" border grid grid-rows-2">
            <div className="">4</div>
            <div className="border">5</div>
          </div>
          <div className=" border">6</div>
          <div className=" col-span-2 border">7</div>
        </div>
      </div>
    </>
  );
}

export default page;
