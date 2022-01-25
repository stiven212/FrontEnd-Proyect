import React from "react";
import { Image } from "antd";
import Slider from "react-slick";

const settings = {
  className: "carousel-images",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  swipeToSlider: true,
};

export default function CarouselImages(props) {
  const { product } = props;


  return (
    <Slider {...settings}>
      <Image
        key={1}
        src={product.image1}
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={2}
        src={product.image2}
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={3}
        src={product.image3}
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={4}
        src={product.image4}
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={5}
        src={product.image5}
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
    </Slider>
  );
}
