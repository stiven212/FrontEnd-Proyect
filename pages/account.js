import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import User from "../api/user";
import { PlusOutlined } from "@ant-design/icons";
import ChangeInfoForm from "../components/Account/ChangeInfoForm";
import { Button } from "antd";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm/AddressForm";
import ListAddress from "../components/Account/ListAddress";

const Account = () => {
  
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();
  
  console.log(user);
  useEffect( () => {
    const  getData = async () => {

      try {
        const response = await User.me(logout);
        setUser(response || null);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

export default Account;

function Configuration(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeInfoForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
      </div>
    </div>
  );
}

function Addresses() {
  const [showModal, setShowModal] = useState(false);

  const [titleModal, setTitleModal] = useState("");

  const [formModal, setFormModal] = useState(null);

  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (titleModal, address) => {
    setTitleModal(titleModal);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Button
          shape="round"
          size="small"
          onClick={() => openModal("Nueva Dirección")}
        >
          <PlusOutlined />
        </Button>
      </div>
      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
