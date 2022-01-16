import React, {useState, useEffect} from 'react'
import { Layout, Row, Col, Input, Image } from 'antd'
import Link from 'next/link'
import { AudioOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const {Search} = Input;

export default function TopBar() {
    return (
        <div className='top-bar'>
            <Layout>
                <Row className='top-bar' justify='center'>
                    <Col span={8} className='top-bar__left'>
                    <Logo/>
                    </Col>
                    <Col span={8} className='top-bar__right'>
                    <Searchc/>
                    </Col>
                </Row>
            </Layout>
        </div>
    )
}



function Logo(){
    return (
        <Link href="/">
            <a>
            <Image preview={false} src='/insignia.png' alt='INSIGNIA' />

            </a>
        </Link>
        )
}


function Searchc(){

    const [load, setLoad] = useState(false);
    const [searchStr, setSearchStr] = useState("");

    const router = useRouter();


    useEffect(() => {
        if(load){

            
            router.push(`search?query=${searchStr}`)
        }
        setLoad(true);
    }, [searchStr])

    // console.log(searchStr);

    const data = (value)=>{
        setSearchStr(value.target.value)
        console.log(searchStr);
    }
    return(
        <Search placeholder="input search text" value={router.query.query} allowClear style={{ width: 220 }} onChange={data} id='search-product'/>
    )
}