import React from "react";

const CategoryBlock = ({ title, onClick, active }) => (
  <div
    className="category"
    onClick={() => onClick?.(title)}
    style={{
      cursor: "pointer",
      backgroundColor: active ? "#fdd600" : "#f2dc99",
      fontWeight: active ? "bold" : "normal",
      border: active ? "2px solid #0039a6" : "none",
    }}
  >
    {title}
  </div>
);

export default CategoryBlock;
