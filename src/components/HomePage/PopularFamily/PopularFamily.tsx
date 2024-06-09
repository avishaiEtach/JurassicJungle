import React from "react";
import "./PopularFamily.scss";

export const PopularFamily = () => {
  return (
    <div className="popular__family__main__container">
      <h3>Popular family's</h3>
      <div className="popular__family__container">
        <div
          datatype="Tyrannosauridae"
          className="popular__family__card card1"
        ></div>
        <div className="container">
          <div
            datatype="Stegosauridae"
            className="popular__family__card card2"
          ></div>
          <div
            datatype="Dromaeosauridae"
            className="popular__family__card card3"
          ></div>
        </div>
        <div
          datatype="Brachiosauridae"
          className="popular__family__card card4"
        ></div>
        <div className="container">
          <div
            datatype="Ceratopsidae"
            className="popular__family__card card5"
          ></div>
          <div
            datatype="Pterosauria"
            className="popular__family__card card6"
          ></div>
        </div>
      </div>
    </div>
  );
};
