import React from "react";
import Styles from "./Styles";
import { useState } from "react";
import "../_styles/DropdownStyle.css";

function DropdownStyle({ element }) {
  const [isActive, setActive] = useState(true);
  const ToggleClass = () => {
    setActive(!isActive);
  };
  return (
    <div className="singleDrop">
      <h1 onClick={ToggleClass}>
        {element[0].Type}
        <i className="fa-solid fa-angle-down"></i>
      </h1>
      <div
        className={isActive ? "style-group hidden" : "style-group"}
        data-id="style-group"
      >
        {element.map((option, index) => {
          return <Styles option={option} key={index}></Styles>;
        })}
      </div>
    </div>
  );
}

export default DropdownStyle;
