import TextField from '@mui/material/TextField';

import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate, Link } from "react-router-dom";
import { request } from '../../api/baseUrl'
import '../../css/LoginStyle.css';
import nccLogo from '../../images/nccsoft_vietnam_logo.png'
interface LoginProps {
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean,
}
export default function Login({setIsLogin, isLogin}: LoginProps){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    if(isLogin) {
        return <div>
                <ul>
                    <li><h1>You are logged in</h1> </li>
                    <li><Link to='/Home'>Go to home</Link></li>
                </ul>
            </div>
    }
    
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
                return token
            })
        .then(res => {
            if(res){
                setIsLogin(true);
                navigate("/Home")
            }
        })   
        .catch(error => {
            if(error.response.data.error.code === 0 ){
                setError(error.response.data.error.details);
            }
            else{
                return 
            }
            
        })
        
    }
    
    
    return(
        
        <div className='Login'>
            <div className="logo">
                <a><img src={nccLogo}></img></a>
                
            </div>
            <h1>TimeSheet</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="UserName or Email"
                    autoComplete="current-password"
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    
                /><br />
                
                <TextField
                    id="filled-basic"
                    type={showPassword ? "text" : "Password"}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <button className="submitBtn" type='submit'> Login </button><br />    
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