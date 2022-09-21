import { useContext, useState, useEffect } from "react";
import { MeQuery,GetAccessMutation } from "../lib/graphQueries";
import { client, getClientHeaders } from "../lib/network";
import { store } from "../stateManagement/store";
import { userDetailAction } from "../stateManagement/actions";

export const accessToken="access";
export const refreshToken="refresh";

export const logout=(props)=>{
    if(localStorage.getItem(accessToken)){
        console.log('logout');
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        window.location.href="/login";
    };
};

export const checkAuthState= async(setCheking, dispatch, props) => {
    let access = localStorage.getItem(accessToken);
    
    if(!access){
        logout(props);
        return
    };
    const userProfile= await client.query({
        query:MeQuery,
        context:getClientHeaders(access)
    }).then(res=>{
        
        return res.data.me;
    }).catch(e=>null);
    
    if(userProfile){
        //Quiere decir que el token de acceso es valido
        setCheking(false);
        //Guardo el usuario en el store
        dispatch.dispatch({type:userDetailAction,payload:userProfile});
    }else{
        //El token no es valido
        let refresh=localStorage.getItem(refreshToken);
        const getNewAccess= await client.mutate({
            mutation:GetAccessMutation,
            variables:{
                refresh
            }
        }).then(res=>{
            return res.data.getAccess.access;
        }).catch(e=>null);

        if(getNewAccess){
            //El token de refresco es valido
            setCheking(false);
            localStorage.setItem(accessToken,getNewAccess);
            
            checkAuthState(setCheking,dispatch,props);
        }else{
            
            logout(props);
        };
    };
};


const AuthController=(props)=>{
    const [cheking,setCheking]=useState(true);
    const dispatch=useContext(store);

    useEffect(()=>{
        checkAuthState(setCheking,dispatch,props);
    },[dispatch,props]);

    return cheking?<div>Checking</div>:props.children;
};

export default AuthController
