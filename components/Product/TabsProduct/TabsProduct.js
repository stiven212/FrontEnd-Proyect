import React from 'react'
import { Tabs } from 'antd';
export default function TabsProduct(props) {
    const {product} = props;
    const { TabPane } = Tabs;

    
function callback(key) {
    console.log(key);
  }

  


    return (
        <>
    <Tabs defaultActiveKey="1" onChange={callback} className='tabs-product'>
    <TabPane tab="Informacion" key="1">
        info
    </TabPane>
    
  </Tabs>
        </>
    )
}
