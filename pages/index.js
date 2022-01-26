import BasicLayout from "../layouts/BasicLayout";
import React, { useState } from "react";
import { Row, Col, Divider } from "antd";
import { Carousel } from "antd";
import { Image } from "antd";
import { Button } from "antd";
import BasicModal from "../components/Modal/BasicModal";
import Auth from "../components/Auth";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import Seo from "../components/Seo";

export default function Home() {
  const { auth } = useAuth();


  return (
    <BasicLayout className="home">
      <Seo />
      <Carrousel />

      <Genres />

      <Ofertas />

      <Categories />

      {!auth && <Register />}
    </BasicLayout>
  );
}

function Carrousel() {
  const contentStyle = {
    height: "360px",
    color: "#fff",
    lineHeight: "220px",
    textAlign: "center",
    // background: '#364d79',
  };
  return (
    <>
      <Divider orientation="left">Carrousel</Divider>
      <Row gutter={10} style={{ justifyContent: "center" }}>
        <Col className="gutter-row" span={22}>
          <Carousel autoplay>
            <div>
              <Link href="/categories/products/2">
                <a>
                  <h3 style={contentStyle} id="first"></h3>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/categories/2">
                <a>
                  <h3 style={contentStyle} id="second"></h3>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/categories/5">
                <a>
                  <h3 style={contentStyle} id="third"></h3>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/categories/products/20">
                <a>
                  <h3 style={contentStyle} id="four"></h3>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/categories/products/34">
                <a>
                  <h3 style={contentStyle} id="five"></h3>
                </a>
              </Link>
            </div>
          </Carousel>
        </Col>
      </Row>
    </>
  );
}

function Genres() {
  const styles = {
    height: "275px",
  };

  return (
    <>
      <Divider orientation="left">Products</Divider>

      <Row gutter={[2, 16]} style={{ justifyContent: "center" }}>
        <Col
          className="gutter-row"
          lg={{ span: 5 }}
          md={{ span: 10 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            alt="Hombres"
            src="https://media.gq.com.mx/photos/616d8b8b7cf20cb28245520c/1:1/w_1999,h_1999,c_limit/ropa-casual-de-hombre-con-saco-como-combinar-con-que-usar.jpg"
            placeholder="blur"
          />
          <Link href="/categories/9">
            <a>
              <div className="overlay">
                <div>Hombres</div>
              </div>
            </a>
          </Link>
        </Col>
        <Col
          className="gutter-row"
          lg={{ span: 5, offset: 1 }}
          md={{ span: 10, offset: 2 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            alt="mujeres"
            src="https://www.myoutfie.com/historias/wp-content/uploads/2019/10/ropa-mujer-casual-5.jpg"
            placeholder="blur"
          />
          <Link href="/categories/8">
            <a>
              <div className="overlay">
                <div >Mujeres</div>
              </div>
            </a>
          </Link>
        </Col>
        <Col
          className="gutter-row"
          lg={{ span: 5, offset: 1 }}
          md={{ span: 10 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            alt="ninos"
            src="https://i.pinimg.com/550x/d6/58/70/d65870a3279c9168b3a3406634d1b370.jpg"
            placeholder="blur"
          />
          <Link href="/categories/7">
            <a>
              <div className="overlay">
                <div>Niños</div>
              </div>
            </a>
          </Link>
        </Col>
        <Col
          className="gutter-row"
          lg={{ span: 5, offset: 1 }}
          md={{ span: 10, offset: 2 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            alt="ninas"
            src="https://i.pinimg.com/originals/a0/26/17/a026174b67fb5027c443da5c22bdf850.jpg"
            placeholder="blur"
          />
          <Link href="/categories/7">
            <a>
              <div className="overlay">
                <div >Niñas</div>
              </div>
            </a>
          </Link>
        </Col>
      </Row>
    </>
  );
}

function Ofertas() {
  const contentStyle = {
    height: "360px",
    color: "#fff",
    lineHeight: "220px",
    textAlign: "center",
    // background: '#364d79',
  };

  return (
    <>
      <Divider orientation="left">Ofertas</Divider>

      <Row gutter={[2, 16]} style={{ justifyContent: "center" }}>
        <Col className="gutter-row" span={22}>
          <Carousel autoplay>
            <div>
              <Link href="/categories/6">
                <a>
                  <h3 style={contentStyle} id="second"></h3>
                </a>
              </Link>
            </div>
          </Carousel>
        </Col>
      </Row>
    </>
  );
}

function Categories() {
  const styles = {
    height: "275px",
  };

  return (
    <>
      <Divider orientation="left">Mas ofertas</Divider>

      <Row
        gutter={[2, 32]}
        style={{ justifyContent: "center", marginBottom: "4em" }}
      >
        <Col
          className="gutter-row"
          lg={{ span: 5 }}
          md={{ span: 10 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            src="https://res.cloudinary.com/teepublic/image/private/s--nIkujgff--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_447/c_crop,g_north_west,h_626,w_470,x_-14,y_-68/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-409,y_-393/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1591818582/production/designs/11196699_0.jpg"
            alt="camisetas"
          />
          <Link href="/categories/1">
            <a>
              <div className="overlay">
                <div >Camisetas</div>
              </div>
            </a>
          </Link>
        </Col>
        <Col
          className="gutter-row"
          lg={{ span: 5, offset: 1 }}
          md={{ span: 10, offset: 2 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            src="https://i.pinimg.com/originals/6f/cb/f6/6fcbf6315f27232300dbe3a77bc29610.png"
            alt="gorras"
            placeholder="blur"
          />
          <Link href="/categories/2">
            <a>
              <div className="overlay">
                <div >Gorras</div>
              </div>
            </a>
          </Link>
        </Col>
        <Col
          className="gutter-row"
          lg={{ span: 5, offset: 1 }}
          md={{ span: 10 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            src="https://www.brildor.com/blog/wp-content/uploads/2019/11/como-sublimar-tazas-1-e1574069564818.png"
            alt="tazas"
          />

          <Link href="/categories/3">
            <a>
              <div className="overlay">
                <div >Tazas</div>
              </div>
            </a>
          </Link>
        </Col>
        <Col
          className="gutter-row"
          lg={{ span: 5, offset: 1 }}
          md={{ span: 10, offset: 2 }}
          sm={{ span: 20 }}
        >
          <Image
            width={200}
            preview={false}
            style={styles}
            src="https://textilesjb.com/wp-content/uploads/2020/09/MASCARILLA-PZ.png"
            alt="mascarillas"
          />

          <Link href="/categories/4">
            <a>
              <div className="overlay">
                <div >Macarillas</div>
              </div>
            </a>
          </Link>
        </Col>
      </Row>
    </>
  );
}

function Register() {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(true);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");

  const onCloseModal = () => setShowModal(false);

  const onShowModal = () => {
    setShowRegister(true);
    setShowModal(true);
  };

  return (
    <>
      <Row gutter={[2, 32]} style={{ justifyContent: "center" }}>
        <Col span={13} className="registrate">
          <Row className="centered">
            <Col lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
              <h2>¿Aun no estas registrado? </h2>
            </Col>
            <Col
              lg={{ span: 10, offset: 2 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
            >
              <Button type="primary" size="large" onClick={onShowModal}>
                <b>Registrate ahora</b>
              </Button>
            </Col>

            <BasicModal
              show={showModal}
              setShow={setShowModal}
              title={titleModal}
              width={500}
            >
              <Auth
                onCloseModal={onCloseModal}
                setTitleModal={setTitleModal}
                showRegister={showRegister}
                setShowRegister={setShowRegister}
              />
            </BasicModal>
          </Row>
        </Col>
      </Row>
    </>
  );
}
