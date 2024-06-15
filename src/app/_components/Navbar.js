"use client";
import React, { useEffect, useState } from "react";
import "../_styles/Navbar.css";
import Link from "next/link";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GlobalAPI from "../utils/GlobalAPI";
function Navbar() {
  const isDesktop = () => {
    return window.matchMedia("(min-width: 768px)").matches;
  };
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
  if (isDesktop()) {
    return (
      <>
        <nav className="bg-transparent">
          <a className="icon" href="/"></a>
          <div>
            <div></div>
            <div>
              <ul className=" nav-links space-x-10 text-3xl mt-10 justify-self-center text-center flex items-center justify-center">
                <li key="1">
                  <Link href="/categories/1">Book Now</Link>
                </li>
                <li key="2">
                  <Link className="" href="/photo_gallery">
                    Gallery
                  </Link>
                </li>
                <li key="3">
                  <Link
                    className=""
                    href="https://www.instagram.com/braidsbyregi/"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
  // Mobile View
  return (
    <>
      <nav>
        <a className="icon" href="/"></a>
        <div></div>
        <Sheet className>
          <SheetTrigger>
            <i className="fa-solid fa-bars"></i>
          </SheetTrigger>
          <SheetContent className="bg-primary w-2/6">
            <div className="pt-12">
              <ul className=" nav-links flex flex-col text-lg text-right gap-4">
                <li key="1">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="">
                        <div className="">Book</div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col">
                          {categories.map((item, index) => {
                            return (
                              <li key={index}>
                                <Link
                                  key={item.id}
                                  href={`/categories/${item.id}`}
                                >
                                  {item.attributes.Name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li key="2">
                  <Link className="" href="/photo_gallery">
                    Gallery
                  </Link>
                </li>
                <li key="3">
                  <Link
                    className=""
                    href="https://www.instagram.com/braidsbyregi/"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}

export default Navbar;
