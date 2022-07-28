import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { isReturnStatement } from 'typescript';

interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean
}
function Home({setIsLogin, isLogin}:LogoutProps){
    
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLogin(false)
        if(!isLogin){
            return navigate('/Login')
        }
        console.log('isLogin home: ', isLogin)
    }
    return(
        <div className="Home">
            <h1>Home</h1>
            <ul>
                <li><Link to='/Login'>Login</Link></li>
                <li><Link to='/Home'>Home</Link></li>
                <li><Link to='/Dashboard'>Dashboard</Link></li>
                <button className='logOutBtn' onClick={handleLogout}>Log out</button>
            </ul>
        </div>
    )
}
export default Home