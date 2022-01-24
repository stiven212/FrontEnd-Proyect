import React, { useState, useEffect } from "react";
import { Layout, Menu, Col, Row, Button, Grid } from "antd";
import Link from "next/link";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  MenuOutlined
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
  // const {getAuthenticatedUser} = User();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.me(logout);
        // const response = await User.getAuthenticatedUser();
        setUser(response);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [auth]);

  useEffect(async () => {
    try {
      const response = await Category.categories();

      //   console.log('response', response.data);
      //setCategories(response.data);

      let a = [];
      for (var i = 0; i <= 4; i++) {
        //     console.log(response.data[i])
        a.push(response.data[i]);
      }

      console.log(a);

      //    a.sort(function(a,b){

      //     return b.id-a.id;
      //    })
      console.log(a);
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
              md={{ span: 23 }}
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

          <Col lg={{ span: 0 }} md={{ span: 1 }} sm={{ span: 0 }} xs={0}>
            
          <MenuOutlined />
            {/* <MenuToggle /> */}
          </Col>
          <Col lg={{ span: 0 }} md={{ span: 0 }} sm={{ span: 1 }} xs={24}>
            
          <MenuOutlined />
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
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}

function MenuToggle() {
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  // console.log(screens.sm);
  // console.log(screens);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    </>
  );
}
