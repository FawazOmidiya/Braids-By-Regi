"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/_components/Navbar";
import GlobalAPI from "@/app/utils/GlobalAPI";
import Styles from "@/app/_components/Styles";
import { useMediaQuery } from "@uidotdev/usehooks";

function Categories({ params }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  // fetching information from backend. UseEffect is called to call functions after decleration
  useEffect(() => {
    getCategoryById();
    getCategories();
  }, []);
  const getCategories = () => {
    GlobalAPI.getCategory().then((category) => {
      console.log(category.data.data);
      setCategoryList(category.data.data);
    });
  };
  const getCategoryById = () => {
    GlobalAPI.getCategoryById(params.cname).then((category) => {
      console.log(category.data.data);
      setCategory(category.data.data);
    });
  };
  if (isDesktop) {
    return (
      <div className="bg-primary">
        <Navbar></Navbar>
        <div className="">
          <h1 className="text-3xl mb-4">{category.attributes?.Name}</h1>
          <div className="grid border divide-x grid-cols-4 h-full">
            <div className="  flex flex-col pt-6">
              <ul className="space-y-4">
                {categoryList.map((category, index) => {
                  return (
                    <li
                      key={index}
                      className=" hover:bg-gray-500 rounded-md w-3/6 justify-between pl-8 pr-8 m-auto transition hover:ease-in-out duration-300"
                    >
                      <a className="w-full" href={`/categories/${category.id}`}>
                        {category.attributes.Name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 col-span-3">
              {category.attributes?.styles.data.map((style, index) => {
                return (
                  <div key={index} className=" p-6">
                    <Styles option={style}></Styles>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Mobile View
  return (
    <div className="bg-primary p-2">
      <Navbar></Navbar>
      <h1>{category.attributes?.Name}</h1>
      <div className="grid grid-cols-2 h-full gap-2">
        {category.attributes?.styles.data.map((style) => {
          return (
            <div className="" key={style.id}>
              <Styles option={style}></Styles>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Categories;
