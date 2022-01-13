import React from 'react'
import { Pagination as Paginationantd } from 'antd';
import {useRouter} from "next/router";
import queryString from "query-string";

export default function Pagination(props) {

    const {totalProducts, page, start} = props;

    const totalPages = Math.ceil(totalProducts / start);

    const total = Math.ceil(totalProducts);
    return (
        <div className='pagination'>
            <Paginationantd 
            defaultCurrent={page}
            total={totalProducts}
            />
        </div>
    )
}
