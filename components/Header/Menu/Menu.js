import React, { useState, useEffect } from "react";
import { Layout, Menu, Col, Row, Grid, Drawer } from "antd";
import Link from "next/link";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import User from "../../../api/user";
import Category from "../../../api/category";
import { map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function MenuWeb() {
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);
  const { auth, logout } = useAuth();
  const onCloseModal = () => setShowModal(false);
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.me(logout);
        setUser(response);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [auth]);

  useEffect(async () => {
    try {
      const response = await Category.categories();


      let a = [];
      for (var i = 0; i <= 4; i++) {
        a.push(response.data[i]);
      }

     
      setCategories(a);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  return (
    <div className="menu">
      <Layout>
        <Row justify="center">
          {screens.md && (
            <Col
              className="menu__left"
              lg={{ span: 11 }}
              md={{ span: 16 }}
              sm={11}
              xs={11}
            >
              <MenuPlatforms categories={categories} />
            </Col>
          )}

          {screens.lg && (
            <Col
              className="menu__right"
              lg={{ span: 6 }}
              md={{ span: 1, offset: 1 }}
            >
              {user !== undefined && (
                <MenuOptions
                  onShowModal={onShowModal}
                  user={user}
                  logout={logout}
                />
              )}
            </Col>
          )}

          {/* {(screens.sm) && ( */}

          <Col
            lg={{ span: 0 }}
            md={{ span: 2, offset: 2 }}
            sm={{ span: 0 }}
            xs={0}
            className="menu__tablet"
          >
            <MenuTablet onShowModal={onShowModal} user={user} logout={logout} />

            {/* <MenuToggle /> */}
          </Col>
          {/* )} */}
          <Col
            lg={{ span: 0 }}
            md={{ span: 0 }}
            sm={{ span: 4, offset: 20 }}
            xs={{ span: 4, offset: 20 }}
            className="menu__mobile"
          >
            <MenuMobile
              categories={categories}
              onShowModal={onShowModal}
              user={user}
              logout={logout}
            />
            {/* <MenuToggle /> */}
          </Col>
        </Row>
      </Layout>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        width={500}
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatforms(props) {
  const { categories } = props;
  return (
    <Menu>
      {map(categories, (categorie) => (
        <Link href={`/categories/${categorie.id}`} key={categorie.id}>
          <a>
            <Menu.Item>{categorie.name}</Menu.Item>
          </a>
        </Link>
      ))}
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  const { productsCart } = useCart();

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/account">
            <a>
              <Menu.Item icon={<UserOutlined style={{ fontSize: "20px" }} />}>
                {user.name}
              </Menu.Item>
            </a>
          </Link>
          <Link href="/orders">
            <a>
              <Menu.Item
                icon={<ShoppingOutlined style={{ fontSize: "20px" }} />}
              >
                Ordenes
              </Menu.Item>
            </a>
          </Link>
          <Link href="/cart">
            <a>
              <Menu.Item>
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", margin: "7px" }}
                />
                {productsCart > 0 && (
                  <label
                    style={{
                      position: "relative",
                      borderRadius: "90%",
                      padding: "3px",
                      top: "-18px",
                      fontWeight: "bold",
                      left: "-5px",
                    }}
                  >
                    {productsCart}
                  </label>
                )}
              </Menu.Item>
            </a>
          </Link>
          <Link href="/wishlist">
            <a>
              <Menu.Item>
                <HeartOutlined style={{ fontSize: "30px", margin: "7px" }} />
              </Menu.Item>
            </a>
          </Link>

          <Menu.Item onClick={logout}>
            <LogoutOutlined style={{ fontSize: "25px", margin: "7px" }} />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal} icon={<UserOutlined />}>
          Iniciar sesión{" "}
        </Menu.Item>
      )}
    </Menu>
  );
}

function MenuTablet(props) {
  const { onShowModal, user, logout } = props;

  const contentStyle = {
    color: "#fff",
  };

  const style = {
    marginBottom: "1em",
    border: "4px solid white",
    padding: "1em",
    borderRadius: "10px",
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const closeLogout = () => {
    logout();
    onClose();
  };

  const closeLogin = () => {
    onShowModal();
    onClose();
  };

  return (
    <Menu>
      <Menu.Item
        icon={
          <MenuOutlined
            style={{
              fontSize: "20px",
              color: "white",
              backgroundColor: "transparent",
            }}
          />
        }
        onClick={showDrawer}
      ></Menu.Item>

      <Drawer
        title="Menu usuario"
        placement="right"
        onClose={onClose}
        visible={visible}
        drawerStyle={{ backgroundColor: "gray", color: "white" }}
        footer={
          <>
            {user ? (
              <Row onClick={closeLogout}>
                <Col span={7} offset={1}>
                  <LogoutOutlined style={{ fontSize: "25px", margin: "7px" }} />{" "}
                </Col>
                <Col span={10}>
                  <h2 style={contentStyle}>Cerrar sesion</h2>
                </Col>
              </Row>
            ) : null}
          </>
        }
      >
        <Row>
          {user ? (
            <>
              <Link href="/account">
                <Col span={24} style={style} onClick={onClose}>
                  <Row>
                    <Col span={7} offset={1}>
                      <UserOutlined style={{ fontSize: "30px" }} />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>{user.name}</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>

              <Link href="/orders">
                <Col span={24} style={style} onClick={onClose}>
                  <Row>
                    <Col span={8} offset={1}>
                      <ShoppingOutlined
                        style={{ fontSize: "30px", marginRight: "20px" }}
                      />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>Ordenes</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>

              <Link href="/cart">
                <Col span={24} style={style} onClick={onClose}>
                  <Row>
                    <Col span={8} offset={1}>
                      <ShoppingCartOutlined
                        style={{ fontSize: "30px", marginRight: "20px" }}
                      />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>Carrito</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>

              <Link href="/wishlist">
                <Col span={24} style={style} onClick={onClose}>
                  <Row>
                    <Col span={8} offset={1}>
                      <HeartOutlined
                        style={{ fontSize: "30px", marginRight: "20px" }}
                      />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>Favoritos</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>
            </>
          ) : (
            <Col span={24} style={style} onClick={closeLogin}>
              <Row>
                <Col span={8} offset={1}>
                  <UserOutlined style={{ fontSize: "30px" }} />{" "}
                </Col>
                <Col span={14}>
                  <h2 style={contentStyle}>Ingresar</h2>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Drawer>
    </Menu>
  );
}

function MenuMobile(props) {
  const { categories, onShowModal, user, logout } = props;

  const [visible, setVisible] = useState(false);

  const style = {
    marginBottom: "3px",
    border: "4px solid white",
    padding: "10px",
    textAlign: "center",
    borderRadius: "10px",
  };

  const contentStyle = {
    color: "#fff",
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const closeLogout = () => {
    logout();
    onClose();
  };

  const closeLogin = () => {
    onShowModal();
    onClose();
  };

  return (
    <Menu>
      <Menu.Item
        icon={
          <MenuOutlined
            style={{
              fontSize: "20px",
              color: "white",
              backgroundColor: "transparent",
            }}
          />
        }
        onClick={showDrawer}
      ></Menu.Item>

      <Drawer
        title="Menu Movil"
        placement="right"
        onClose={onClose}
        visible={visible}
        headerStyle={{ backgroundColor: "#09D309" }}
        drawerStyle={{ backgroundColor: "gray", color: "white" }}
        footer={
          <>
            {user ? (
              <Row onClick={closeLogout}>
                <Col span={7} offset={1}>
                  <LogoutOutlined style={{ fontSize: "25px", margin: "7px" }} />{" "}
                </Col>
                <Col span={10}>
                  <h2 style={contentStyle}>Cerrar sesion</h2>
                </Col>
              </Row>
            ) : null}
          </>
        }
      >
        <Row>
          {map(categories, (categorie) => (
            <Link href={`/categories/${categorie.id}`} key={categorie.id}>
              <Col span={24} style={style} onClick={onClose}>
                <h2 style={contentStyle}>{categorie.name}</h2>
              </Col>
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/account">
                <Col span={24} style={style}>
                  <Row>
                    <Col span={7} offset={1}>
                      <UserOutlined style={{ fontSize: "30px" }} />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>{user.name}</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>

              <Link href="/orders">
                <Col span={24} style={style}>
                  <Row>
                    <Col span={8} offset={1}>
                      <ShoppingOutlined
                        style={{ fontSize: "30px", marginRight: "20px" }}
                      />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>Ordenes</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>

              <Link href="/cart">
                <Col span={24} style={style}>
                  <Row>
                    <Col span={8} offset={1}>
                      <ShoppingCartOutlined
                        style={{ fontSize: "30px", marginRight: "20px" }}
                      />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>Carrito</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>

              <Link href="/wishlist">
                <Col span={24} style={style}>
                  <Row>
                    <Col span={8} offset={1}>
                      <HeartOutlined
                        style={{ fontSize: "30px", marginRight: "20px" }}
                      />
                    </Col>
                    <Col span={10}>
                      <h2 style={contentStyle}>Favoritos</h2>
                    </Col>
                  </Row>
                </Col>
              </Link>
            </>
          ) : (
            <Col span={24} style={style} onClick={closeLogin}>
              <Row>
                <Col span={4} offset={1}>
                  <UserOutlined style={{ fontSize: "30px" }} />{" "}
                </Col>
                <Col span={14}>
                  <h2 style={contentStyle}>Ingresar</h2>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Drawer>
    </Menu>
  );
}
