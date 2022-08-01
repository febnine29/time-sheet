import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { isReturnStatement } from 'typescript';
import ResponsiveAppBar from './Home-Nav';
import Profile from './Profile';
import ProjectManager from './ProjectManager';
import TaskManager from './TaskManager';
interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean
}
function Home({setIsLogin, isLogin}:LogoutProps){
    return(
        <div className="Home">
            <ResponsiveAppBar isLogin={isLogin} setIsLogin={setIsLogin}/>

            <h1>Home</h1>
        </div>
    )
}
export default Home