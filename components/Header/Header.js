import React from "react";
import TopBar from "./TopBar";
import Menu from "./Menu";
import { Col, Row } from "antd";


export default function Header() {
  return (
    <div className="header">
      <Row>
        <Col lg={24} sm={24} md={24} xs={24}>
          <TopBar />
        </Col>
        <Col lg={24} sm={24} md={24} xs={24}>
          <Menu />
        </Col>
      </Row>
    </div>
  );
}
