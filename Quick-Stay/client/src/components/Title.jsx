import React from "react";

const Title = ({
  title,
  subTitle,
  align,
  colorClass = "text-[var(--black-one)]",
  style,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        align === "left" ? "md:items-start md:text-left" : ""
      }`}
    >
      <h1
        style={style}
        className={`text-4xl md:text-[40px] font-bold z-10 ${colorClass}`}
      >
        {title}
      </h1>
      <p
        style={style}
        className={`text-sm md:text-base mt-2 max-w-[600px] z-10 ${colorClass}`}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
