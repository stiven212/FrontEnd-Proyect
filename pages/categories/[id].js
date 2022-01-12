import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router';


export default function categorie() {

    const {query} = useRouter();

    console.log(query)
    return (
        <BasicLayout className="categorie">
            <h1>Estamos en la categorias : {query.id}</h1>
        </BasicLayout>
    )
}
