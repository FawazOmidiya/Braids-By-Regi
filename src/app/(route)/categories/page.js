"use client";
import Navbar from "@/app/_components/Navbar";
import React, { useEffect, useState } from "react";
import GlobalAPI from "@/app/utils/GlobalAPI";
function Page() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    GlobalAPI.getCategory().then((categories) => {
      console.log(categories.data.data);
      setCategories(categories.data.data);
    });
  };
  return (
    <div className="bg-green h-screen">
      <Navbar></Navbar>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <a href={`/categories/${category.id}`}>
                {category.attributes.Name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Page;
