import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import Login from '../components/auth/Login';
import TestMessage from '../components/common/Common'
interface ProtectedProps{
    isLogin: boolean;
    children: any
}
export default function ProtectedRoute({isLogin , children}: ProtectedProps ) {
    
    
    if(!isLogin){
        return <Navigate to='/Login' replace />
    }
    console.log({children});

    return children ? children : <Outlet /> 

}