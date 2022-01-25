import moment from "moment";
import React from "react";
import CarouselImages from "../CarouselImages";
import "moment/locale/es";

export default function InfoProduct(props) {
  const { product } = props;

  return (
    <div className="info-product">
      <CarouselImages product={product} />

      <div className="info-product__content">
        <div dangerouslySetInnerHTML={{ __html: product.description }} />

        <div className="info-product__content-color">
          <h4>Color</h4>
          <p>{product.color}</p>
          {/* <p>{moment(product.created_at).format("LL")}</p> */}
        </div>
      </div>
    </div>
  );
}
