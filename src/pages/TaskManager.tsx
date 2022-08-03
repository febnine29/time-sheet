import { useEffect, useState } from 'react';
import ResponsiveAppbar from './Home-Nav';
import axios from 'axios';
import { request } from '../api/baseUrl';
import {setToken} from '../components/common/Common';
import NewTask from '../components/task/NewTask';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {getAllTask} from '../tscript/Task';
import {dataTaskForm} from '../tscript/Task';
export interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean;
    // titles: dataTaskForm[] | null;
}


function TaskManager({
    isLogin, 
    setIsLogin,
    // titles
}: LogoutProps){
    const [title, setTitle] = useState([] as any[])
    const [cmTask, setCmTask] = useState([])
    useEffect(()=>{
        getAllTask.get(`/api/services/app/Task/GetAll`)
        .then(response => {
            setTitle(response.data.result);
            console.log(response.data.result.name)
        })
    },[])
    const filtered = title.filter(specTask => specTask.type === 0)
    // useEffect(() =>{
    //     setCmTask(title.filter((title) => title.type === 0))
    // },[title])
    console.log('filtered[]:', filtered)
    return (
        <div className="TaskManager navbar">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            <div className='main-body main-task'>
                <h1>Task Manager</h1>
                <NewTask /> 
                <ul style={{listStyleType: 'none', padding:'20px'}}>
                {filtered.map((index:number) => (
                    <li key={index}>
                        
                        <div style={{width:'50%', marginRight:'auto', display:'inline-block', textAlign:'left'}}>
                            {filtered}
                            </div>
                        <div style={{width:'50%', marginLeft:'auto', display: 'inline-block'}}>
                            <div style={{float:'right'}}>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button color="warning">Edit</Button>
                                <Button>Archive</Button>
                                <Button color="error">Delete</Button>
                            </ButtonGroup>
                            </div>
                        </div>
                          
                    </li>
                ))} 
                </ul>
            </div>
        </div>
    )
}
export default TaskManager;
