import * as React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ResponsiveAppbar from './Home-Nav';
import {authRequest} from '../api/baseUrl'
import { useEffect, useState } from 'react';
import NewProject from '../components/project/NewProject'
import {AllProjectData, Result} from '../tscript/Project'
interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean
}
interface getProjectProps{
    status?: string;
    search?: string;
    
}
interface ProjectState{ 
    projects: AllProjectData[] | null
}
function ProjectManager({isLogin, setIsLogin}: LogoutProps){

    const [projects, setProjects] = React.useState([] as any[])
    const getAllProject = async (data?: getProjectProps) => {
        const {status = "", search = ""} = data!;
        try{
            const response = await authRequest.get(`/api/services/app/Project/GetAll?status=${status}&search=${search}`);
            setProjects(response.data.result)
            
            return response.data;
        }
        catch (error){
            console.log(error)
        } 
    }
    
    
    // ----------FILTER SINGLE PROJECT FOLLOW TO CUSTOMER-NAME------------
    const transformProject = (
    projectData: AllProjectData[] | null
    ) => {
    return projectData?.reduce<Result[]>((acc, cur) => {
        const { customerName, ...rest } = cur;
        if (acc.every((item) => item.customerName !== cur.customerName)) {
        acc.push({
            customerName: cur.customerName,
            data: [rest],
        });
        } else {
        const index = acc.findIndex(
            (item) => item.customerName === cur.customerName
        );   
        acc[index].data.push(rest);
        }
        return acc;
    }, []);
    };
    // -----------TEST--------------
    const [projectStatus, setProjectStatus] = React.useState("")
    // const activeProjects = projects.filter(filterActive => filterActive.status === 1)
    // const deActiveProjects = projects.filter(filterActive => filterActive.status === 0)

    const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        setProjectStatus(e.target.value)
        if (!e.target.value) {
            getAllProject({ status: "", search: searchFilter });
        } else {
        getAllProject({ status: e.target.value, search: searchFilter });
        }
       
    }
    const [searchFilter, setSearchFilter] = useState("")
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(e.target.value)
    }
    useEffect(() => {
        getAllProject({ status: projectStatus, search: searchFilter})
    },[])
    
    return (
        <div className="ProjectManager">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            
            <div className='main-body main-project'>
                <h1>Project Manager</h1>
                <NewProject />
                
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter by project status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projectStatus}
                            label="Filter by project status"
                            onChange={(e) => handleSelectOption(e as any)}
                        >
                            <MenuItem value={"0"}>Active</MenuItem>
                            <MenuItem value={"1"}>DeActive</MenuItem>
                            <MenuItem value={""}>All</MenuItem>
                        </Select>
                        <TextField 
                            id="outlined-basic" 
                            label="Search by client or project name" 
                            variant="outlined" sx={{margin: '10px 0px'}} 
                            onChange={(e) => handleSearchInput(e as any)}/>
                    </FormControl>
                </Box>
                {transformProject(projects)?.map((item,index) => {
                    return (
                        <div key={index}>
                            <div className='customer-name' style={{background: 'darkCyan'}}>{item.customerName}</div>
                            <div className='single-project'>
                                {item.data.map((data, index) => (
                                    <div key={index} className='project-name' style={{marginBottom: '10px'}}>
                                        <span style={{display: 'flex'}}>
                                        <span style={{color: 'black', fontSize:'16px'}}>{data.name}</span>
                                        <span style={{background: '#2E95EA'}}>{data.pms.join(', ')}</span>
                                        <span style={{background: 'red'}}>{data.activeMember} members</span>
                                        <span style={{background: '#4CAF50'}}> {dayjs(data.timeStart).format('DD/MM/YYYY')}{data.timeEnd ? <span>- {dayjs(data.timeEnd).format('DD/MM/YYYY')}</span> : ""}</span>
                                        
                                        <span className='active-status' style={{marginLeft: 'auto'}}>{data.status  ? <span style={{background: 'grey'}}>InActive</span> 
                                                            : <span style={{background: '#4CAF50'}}>Active</span>}</span>
                                        </span>
                                    </div>
                            ))}

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        
    )
}
export default ProjectManager;
