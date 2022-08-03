import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import Login from '../components/auth/Login';
import TestMessage from '../components/common/Common'
interface ProtectedProps{
    isLogin: boolean;
    children: any
}
export default function ProtectedRoute({isLogin , children}: ProtectedProps ) {
    const navigate = useNavigate()
  
    if(!isLogin){
        return <Navigate to='/' replace />
    }

    return children 

}