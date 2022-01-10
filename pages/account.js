import React, {useState, useEffect} from 'react'
import BasicLayout from "../layouts/BasicLayout";
import {useRouter} from "next/router";
import useAuth from '../hooks/useAuth';
import User from '../api/user';
import ChangeInfoForm from '../components/Account/ChangeInfoForm';

export default function account() {

    const router = useRouter();

    const [user, setUser] = useState(undefined);
    const {auth, logout} = useAuth();

    useEffect( async () => {
        
        try{
            const response = await User.me(logout);
            setUser(response || null)
        }catch(e){
            console.log(e);
        }
        
    }, [auth]);

    if(user === undefined) return null;

    if(!auth && !user){
        router.replace("/");
        return null;
    }


    return (
        <BasicLayout className="account">
            <Configuration user={user}/>

        </BasicLayout>
    )
}



function Configuration(props){
    const {user} = props;
    return(
        <div className='account__configuration'>
                <div className='title'>Configuracion</div>
                <div className='data'>
                    <ChangeInfoForm user={user} />
                </div>
            </div>
    )
}
