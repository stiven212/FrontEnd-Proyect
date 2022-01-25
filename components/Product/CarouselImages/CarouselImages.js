import React, { useState } from "react";
import { Image, Modal } from "antd";
import Slider from "react-slick";
import { map } from "lodash";

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

  console.log(product);

  return (
    <Slider {...settings}>
      {/* <Image
        key={1}
        src={
          "http://localhost:8000/storage/products/2bzeaTN8hf6DcA6VSAvzfWYWcOt9dGnpdgS1T3eK.png"
        }
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={2}
        src={
          "http://localhost:8000/storage/products/2VZWZxHZo7bxmIkwiToqQmmuchNBn8i7VlGmkMAH.png"
        }
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={3}
        src={
          "http://localhost:8000/storage/products/APOu2peZNTuU863VPmES2OwRto1uWgPdA17h6OUh.png"
        }
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={4}
        src={
          "http://localhost:8000/storage/products/BxSjYrAk2Md8tlUwvdbNV7F9iNQgJ2JBezasDxla.png"
        }
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      />
      <Image
        key={5}
        src={
          "http://localhost:8000/storage/products/cDAwDoILbxVrp2uB30GWqb0bwNNCC8BOvjbXOkaC.jpg"
        }
        alt={product.name}
        onClick={() => console.log("Abrir imagen")}
        preview={true}
      /> */}
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
