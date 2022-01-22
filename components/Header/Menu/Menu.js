import React, {useState, useEffect} from 'react'
import {Layout, Menu, Col, Row} from "antd";
import Link from 'next/link';
import {UserOutlined, ShoppingCartOutlined, HeartOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';
import BasicModal from '../../Modal/BasicModal';
import Auth from '../../Auth';
import useAuth from '../../../hooks/useAuth';
import User from "../../../api/user" ;
import Category from '../../../api/category';
import {map} from "lodash";
import useCart from '../../../hooks/useCart';


export default function MenuWeb() {

    const [categories, setCategories] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const onShowModal = () => setShowModal(true);
    const {auth, logout} = useAuth();
    const onCloseModal = () => setShowModal(false);

   // const {getAuthenticatedUser} = User();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        
        (async ()=> {
            try{

               const response = await User.me(logout);
               // const response = await User.getAuthenticatedUser();
               setUser(response); 
               console.log(response); 
            }catch(e){
                console.log(e);
            }

        }) ()
    }, [auth])

    useEffect(async () => {
        
        try {
            const response = await Category.categories();

         //   console.log('response', response.data);
            //setCategories(response.data);

            let a = [];
            for(var i=0; i <= 4 ; i++){
           //     console.log(response.data[i])
                a.push(response.data[i])
            }
            
           console.log(a)

        //    a.sort(function(a,b){
            
        //     return b.id-a.id;
        //    })
           console.log(a);
            setCategories(a);
        } catch (error) {
            console.log('error',error);
        }
        
    }, [])


    const [titleModal, setTitleModal] = useState("Iniciar sesión");
    return (
        <div className="menu">

            <Layout>
                <Row justify='center'> 
                    <Col className='menu__left' lg={{span:11}} md={{span:11}}>
                    <MenuPlatforms categories={categories}/>
                    </Col>
                    <Col className='menu__right' lg={{span:6}} md={{span:11}}>
                        {user !== undefined && 
                        <MenuOptions 
                        onShowModal={onShowModal} 
                        user={user} 
                        logout={logout}/>}
                    
                    

                    </Col>
                </Row>
            </Layout>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} width={500}>
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}/>
            </BasicModal>
        </div>
    )
}


function MenuPlatforms(props){

    const {categories} = props;
    return (
        <Menu>
           {map(categories, (categorie)=>(
               <Link href={`/categories/${categorie.id}`} key={categorie.id}>
                   
                   <a>

                   <Menu.Item>
                        {categorie.name}
                   </Menu.Item>

                   </a>
               </Link>
           ))}

           
        </Menu>
    )
}


function MenuOptions(props){

    const {onShowModal, user, logout} = props;
    const {productsCart} = useCart();

    return (
        <Menu>
            {user ? (
                <>
                
                <Link href="/account">
                    <a>

                <Menu.Item icon={<UserOutlined style={{fontSize:'20px'}}/>}>
                {user.name}
                </Menu.Item>
                    </a>
                </Link>
                <Link href="/orders">
                    <a>

                <Menu.Item icon={<ShoppingOutlined style={{fontSize:'20px'}}/>}>
                
                Ordenes
                </Menu.Item>
                    </a>
                </Link>
                <Link href="/cart">
                    <a>

                <Menu.Item >
                <ShoppingCartOutlined style={{fontSize:'30px',margin:'7px'}}/>
                {productsCart > 0 && ( 
                    <label style={{position:'relative', borderRadius:'90%', padding:'3px', top:'-18px', fontWeight:'bold', left:'-5px'}}>
                    {productsCart}
                </label>
                )}
                
                </Menu.Item>
                    </a>
                </Link>
                <Link href="/wishlist">
                    <a>

                <Menu.Item >
                <HeartOutlined style={{fontSize:'30px',margin:'7px'}}/>
                </Menu.Item>
                    </a>
                </Link>
                
                 <Menu.Item onClick={logout}>
                 
                 <LogoutOutlined style={{fontSize:'25px',margin:'7px'}}/>
                 </Menu.Item>
                </>
            ):
            (
                <Menu.Item onClick={onShowModal} icon={<UserOutlined />}>

                    Mi cuenta
                </Menu.Item>

            )
            }
        
        </Menu>
    )
}