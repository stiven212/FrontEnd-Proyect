import React, { useState } from "react";
import { Layout, Row, Col, Menu, Modal } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

export default function Top() {
  return (
    <div className="top">
      <Layout>
        <Row className="top" justify="center">
          <Col lg={{ span: 8 }} md={{ span: 8 }} className="top__left">
            <Network />
          </Col>
          <Col
            lg={{ span: 8, offset: 2 }}
            md={{ span: 10 }}
            sm={{ span: 21 }}
            xs={{ span: 20 }}
            className="top__right"
          >
            <Policies />
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

function Network() {
  return (
    <ul>
      <li>
        <a href="https://www.facebook.com/insigniaestampados" target="_blank"  rel="noreferrer">
          <FacebookOutlined style={{ fontSize: "26px", color: "#fff" }} />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/disenoxtremo7/" target="_blank"  rel="noreferrer">
          <InstagramOutlined style={{ fontSize: "26px", color: "#fff" }} />
        </a>
      </li>
      <li>
        <a
          href="https://api.whatsapp.com/send?phone=593993818915&app=facebook&entry_point=page_cta"
          target="_blank" 
          rel="noreferrer"
        >
          <WhatsAppOutlined style={{ fontSize: "26px", color: "#fff" }} />
        </a>
      </li>
    </ul>
  );
}

function Policies() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModal1 = () => {
    setIsModalVisible1(true);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  return (
    <Layout>
      <Row>
        <Col
          lg={{ span: 10 }}
          md={{ span: 10 }}
          sm={{ span: 11, offset: 4 }}
          xs={{ span: 11, offset: 4 }}
          onClick={showModal}
        >
          <h3>Términos y condiciones</h3>
        </Col>
        <Modal
          title="Términos y condiciones"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer=""
          bodyStyle={{ height: "30em", overflow: "scroll" }}
          width={1000}
        >
          <h2>
            <strong>Términos y Condiciones de Uso</strong>
          </h2>
          <p>&nbsp;</p>
          <p>
            <strong>INFORMACIÓN RELEVANTE</strong>
          </p>
          <p>
            Es requisito necesario para la adquisición de los productos que se
            ofrecen en este sitio, que lea y acepte los siguientes Términos y
            Condiciones que a continuación se redactan. El uso de nuestros
            servicios así como la compra de nuestros productos implicará que
            usted ha leído y aceptado los Términos y Condiciones de Uso en el
            presente documento. Todas los productos &nbsp;que son ofrecidos por
            nuestro sitio web pudieran ser creadas, cobradas, enviadas o
            presentadas por una página web tercera y en tal caso estarían
            sujetas a sus propios Términos y Condiciones. En algunos casos, para
            adquirir un producto, será necesario el registro por parte del
            usuario, con ingreso de datos personales fidedignos y definición de
            una contraseña.
          </p>
          <p>
            El usuario puede elegir y cambiar la clave para su acceso de
            administración de la cuenta en cualquier momento, en caso de que se
            haya registrado y que sea necesario para la compra de alguno de
            nuestros productos. insignia.com no asume la responsabilidad en caso
            de que entregue dicha clave a terceros.
          </p>
          <p>
            Todas las compras y transacciones que se lleven a cabo por medio de
            este sitio web, están sujetas a un proceso de confirmación y
            verificación, el cual podría incluir la verificación del stock y
            disponibilidad de producto, validación de la forma de pago,
            validación de la factura (en caso de existir) y el cumplimiento de
            las condiciones requeridas por el medio de pago seleccionado. En
            algunos casos puede que se requiera una verificación por medio de
            correo electrónico.
          </p>
          <p>
            Los precios de los productos ofrecidos en esta Tienda Online es
            válido solamente en las compras realizadas en este sitio web.
          </p>
          <p>
            <strong>LICENCIA</strong>
          </p>
          <p>
            Insignia&nbsp; a través de su sitio web concede una licencia para
            que los usuarios utilicen&nbsp; los productos que son vendidos en
            este sitio web de acuerdo a los Términos y Condiciones que se
            describen en este documento.
          </p>
          <p>
            <strong>USO NO AUTORIZADO</strong>
          </p>
          <p>
            En caso de que aplique (para venta de software, templetes, u otro
            producto de diseño y programación) usted no puede colocar uno de
            nuestros productos, modificado o sin modificar, en un CD, sitio web
            o ningún otro medio y ofrecerlos para la redistribución o la reventa
            de ningún tipo.
          </p>
        </Modal>
        <Col
          lg={{ span: 10 }}
          md={{ span: 10, offset: 0 }}
          sm={{ span: 10, offset: 4 }}
          xs={{ span: 11, offset: 4 }}
          onClick={showModal1}
        >
          <h3> Acerca de Nosotros</h3>
        </Col>
        <Modal
          title="Acerca de Nosotros"
          visible={isModalVisible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          footer=""
        >
          <p>
            <strong>PROPIEDAD</strong>
          </p>
          <p>
            Usted no puede declarar propiedad intelectual o exclusiva a ninguno
            de nuestros productos, modificado o sin modificar. Todos los
            productos son propiedad &nbsp;de los proveedores del contenido. En
            caso de que no se especifique lo contrario, nuestros productos se
            proporcionan&nbsp; sin ningún tipo de garantía, expresa o implícita.
            En ningún esta compañía será &nbsp;responsables de ningún daño
            incluyendo, pero no limitado a, daños directos, indirectos,
            especiales, fortuitos o consecuentes u otras pérdidas resultantes
            del uso o de la imposibilidad de utilizar nuestros productos.
          </p>
        </Modal>
      </Row>
      <Row>
        <Col
          lg={{ span: 10, offset: 4 }}
          md={{ span: 12 }}
          sm={{ span: 10, offset: 2 }}
          xs={{ span: 11, offset: 4 }}
        >
          <h3>Contactanos</h3>
        </Col>
        <Col
          lg={{ span: 10 }}
          md={{ span: 10, offset: 0 }}
          sm={{ span: 10, offset: 3 }}
          xs={{ span: 11, offset: 4 }}
          onClick={showModal2}
        >
          <h3>Politicas de uso</h3>
        </Col>
        <Modal
          title="Politicas de uso"
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          footer=""
        >
          <p>
            <strong>POLÍTICA DE REEMBOLSO Y GARANTÍA</strong>
          </p>
          <p>
            En el caso de productos que sean&nbsp; mercancías irrevocables
            no-tangibles, no realizamos reembolsos después de que se envíe el
            producto, usted tiene la responsabilidad de entender antes de
            comprarlo. &nbsp;Le pedimos que lea cuidadosamente antes de
            comprarlo. Hacemos solamente excepciones con esta regla cuando la
            descripción no se ajusta al producto. Hay algunos productos que
            pudieran tener garantía y posibilidad de reembolso pero este será
            especificado al comprar el producto. En tales casos la garantía solo
            cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto
            se haya usado correctamente. La garantía no cubre averías o daños
            ocasionados por uso indebido. Los términos de la garantía están
            asociados a fallas de fabricación y funcionamiento en condiciones
            normales de los productos y sólo se harán efectivos estos términos
            si el equipo ha sido usado correctamente.
          </p>
        </Modal>
      </Row>
    </Layout>
  );
}
