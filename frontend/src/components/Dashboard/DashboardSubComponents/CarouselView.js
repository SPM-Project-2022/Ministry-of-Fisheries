import React, { useState, useEffect } from "react";
import { Carousel, Spin } from "antd";
import CarouselImg1 from "../assets/1.jpg";
import CarouselImg2 from "../assets/2.jpg";
import CarouselImg3 from "../assets/3.jpg";
import CarouselImg4 from "../assets/4.jpg";

const contentStyle = {
  height: "470px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselView = () => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);
  return (
    <>
      <Carousel autoplay>
        {loader === false && <Spin />}

        <div>
          <img src={CarouselImg1} style={contentStyle} />
        </div>
        <div>
          <img src={CarouselImg2} style={contentStyle} />
        </div>
        <div>
          <img src={CarouselImg3} style={contentStyle} />
        </div>
        <div>
          <img src={CarouselImg4} style={contentStyle} />
        </div>
      </Carousel>
    </>
  );
};

export default CarouselView;
