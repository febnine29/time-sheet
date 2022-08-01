import { useEffect } from 'react';
import ResponsiveAppbar from './Home-Nav';
import axios from 'axios';
import { request } from '../api/baseUrl';
import {setToken} from '../components/common/Common'
interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean
}
function TaskManager({isLogin, setIsLogin}: LogoutProps){

    useEffect(()=>{
        const token = localStorage.getItem('accessToken')

        const instance = axios.create({
            baseURL: 'http://dev-api-timesheet.nccsoft.vn',
            headers: { Authorization: `Bearer ${token}` },
          });
        instance.get(`/api/services/app/Task/GetAll`)
        .then(response => {
            
            console.log('success', response.data)
            // return response.data;
    })
    },[])
    
    
    return (
        <div className="TaskManager navbar">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            <div className='main-body main-task'>
                <h1>Task Manager</h1>
            </div>
        </div>
    )
}
export default TaskManager;
