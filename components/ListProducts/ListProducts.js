import React from "react";
import { map } from "lodash";
import { Image, Row, Col } from "antd";
import Link from "next/link";

export default function ListProducts(props) {
  const { products } = props;

  return (
    <div className="list-products">
      <Row>
        {map(products, (product) => (
          <Col
            lg={{ span: 5, offset: 1 }}
            md={{ span: 6, offset: 2 }}
            sm={{ span: 10, offset: 2 }}
            xs={{ span: 10, offset: 2 }}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Product(props) {
  const { product } = props;
  return (
    <div className="list-products__product">
      <Link href={`/categories/products/${product.id}`}>
        <a>
          <div className="list-products__product-image">
            <Image src={product.image1} alt={product.name} preview={false} />

            {/* <Image
              src={
                "http://localhost:8000/storage/products/APOu2peZNTuU863VPmES2OwRto1uWgPdA17h6OUh.png"
              }
              preview={false}
            /> */}
            <div className="list-products__product-image-info">
              <span className="price">{product.price}$</span>

              {product.sale ? (
                <span className="discount">{product.sale}$</span>
              ) : (
                <span></span>
              )}
            </div>
          </div>

          <h2>{product.name}</h2>
        </a>
      </Link>
    </div>
  );
}
