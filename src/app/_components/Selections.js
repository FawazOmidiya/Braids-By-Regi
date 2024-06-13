import React, { useState, useEffect } from "react";
import "../_styles/Selections.css";
import Styles from "./Styles";
import GlobalAPI from "../utils/GlobalAPI";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Selections() {
  const [categories, setCategories] = useState([]);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    getCategory();
    getStyles();
  }, []);
  const getStyles = () => {
    GlobalAPI.getStyle().then((styles) => {
      setStyles(styles.data.data);
    });
  };
  const getCategory = () => {
    GlobalAPI.getCategory().then((categories) => {
      setCategories(categories.data.data);
    });
  };
  return (
    <div className="selectionsContainer">
      {/* Mapping the set of data, to separate each hairstyle Type */}
      {categories.map((item, index) => {
        return (
          <>
            <Accordion
              type="single"
              collapsible
              className="w-full items-center"
              key={index}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className=" items-center">
                  {item.attributes.Name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="style-group gap-6 p-4">
                    {item.attributes.styles.data.map((option, index) => {
                      return <Styles option={option} key={index}></Styles>;
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        );
      })}
    </div>
  );
}

export default Selections;
