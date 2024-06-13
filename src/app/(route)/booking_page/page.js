"use client";
import React, { useEffect, useState } from "react";
import Selections from "../../_components/Selections";
import Navbar from "../../_components/Navbar";
import "../../_styles/BookingPage.css";
import Footer from "../../_components/Footer";
import GlobalAPI from "@/app/utils/GlobalAPI";

function BookingPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    GlobalAPI.getCategory().then((categories) => {
      console.log(categories.data.data);
      setCategories(categories.data.data);
    });
  };
  return (
    <div className="StylePage">
      <Navbar></Navbar>
      <div className="content-wrapper">
        <Selections></Selections>
      </div>
    </div>
  );
}
export default BookingPage;
