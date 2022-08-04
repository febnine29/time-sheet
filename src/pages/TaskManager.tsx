import { useEffect, useState } from 'react';
import ResponsiveAppbar from './Home-Nav';
import axios from 'axios';
import { request } from '../api/baseUrl';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function TaskManager({
    isLogin, 
    setIsLogin,
    // titles
}: LogoutProps){
    const [title, setTitle] = useState([] as any[])
    useEffect(()=>{
        getAllTask.get(`/api/services/app/Task/GetAll`)
        .then(response => {
            setTitle(response.data.result);
            console.log(response.data.result.name)
        })
    },[])
    const commonTasks = title.filter(cmTasks => cmTasks.type === 0)
    const otherTasks = title.filter(otTasks => otTasks.type === 1)
    console.log('common tasks:', commonTasks)
    console.log('other Tasks', otherTasks)

    return (
       
        <Box className="TaskManager navbar" sx={{ flexGrow: 1 }}>
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Grid container className='main-body main-task' columns={{ xs: 4, md: 16}} >
                <h1>Task Manager </h1>
                <NewTask /> 
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 16}}>
                <Grid item xs={4} md={8}>
                <Item className='commonTasks'>
                    <h1>Common Tasks</h1>
                    <ul style={{listStyleType: 'none', padding:'20px'}}>
                    {commonTasks.map((data:any, index:number) => (
                        <li key={index}>
                            <div className='overflowTitle' style={{width:'50%', marginRight:'auto', display:'inline-block', textAlign:'left'}}>
                                {data.name}
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
                </Item>
                </Grid>
                <Grid item xs={4} md={8}>
                <Item className='otherTasks'>
                    <h1>Other Tasks</h1>
                    <ul style={{listStyleType: 'none', padding:'20px'}}>
                        {otherTasks.map((data:any, index:number) => (
                        <li key={index}>
                            <div style={{width:'50%', marginRight:'auto', display:'inline-block', textAlign:'left'}}>
                                {data.name}
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
                </Item>
                </Grid>
                </Grid>
            </Grid>
        </Box>
        
    )
}
export default TaskManager;
