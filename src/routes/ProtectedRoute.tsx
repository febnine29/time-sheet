import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import Login from '../components/auth/Login';
import TestMessage from '../components/common/Common'
interface ProtectedProps{
    isLogin: boolean;
    children: any
}
export default function ProtectedRoute({isLogin , children}: ProtectedProps ) {
    
    useEffect(() =>{
       const redirectPath='/Login'
    }, [])
    
    if(!isLogin){
        return <Navigate to={redirectPath} replace />
    }
    console.log({children});

    return children ? children : <Outlet /> 

}