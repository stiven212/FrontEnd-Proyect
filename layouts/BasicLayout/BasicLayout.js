import React from "react";
import { Layout } from "antd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import classNames from "classnames";

export default function BasicLayout(props) {
  const { children, className } = props;
  // className='basic-layout'

  return (
    <Layout
      fluid
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />
      <Layout className="content">{children}</Layout>
      <Footer />
    </Layout>
  );
}
