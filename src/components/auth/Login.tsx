
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { LoginData } from '../../tscript/Auth'
import { request } from '../../api/baseUrl'
import { loginApi } from '../../api/authApi';
import useAuth from '../../routes/ProtectedRoute'
interface LoginProps {
    setIsLogin: (agr :boolean) => void,
    
}
export default function Login({setIsLogin}: LoginProps){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const toggleShow = () => {
        setShowPassword(!showPassword) //mount and unmount
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        request.post(`/api/TokenAuth/Authenticate`, {
            userNameOrEmailAddress: email,
            password: password,
            rememberClient: false,
        })
        .then (response => {
                const token = response.data.result.accessToken
                localStorage.setItem('accessToken', token)
                console.log("token: ", response.data.result.accessToken);
                
                
                return token
            })
        .then(res => {
            if(res){
                setIsLogin(true);
                navigate("/Profile")
            }
        })   
        .catch(error => {
            if(error.response.data.error.code === 0 ){
                console.log(error.response.data.error.details);
                setError(error.response.data.error.details);
            }
            else{
                return 
            }
            
        })
        
    }
    
    
    return(
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <span>Username or email address</span> <br/>
                <input 
                    type="text" 
                    name="userNameOrEmailAddress"
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <span> Password </span><br/>
                <input
                    type={showPassword ? "text" : "Password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <br/>
                <button type='submit'> Login </button><br />    
                <span style={{color: "red"}}>{error}</span>
            </form>
            <button  
                disabled={!password} 
                className="visibleIcon" 
                onClick={toggleShow}>
                {showPassword ? "hide password" : "show password"}
            </button><br/>
        </div>
    )
    
}