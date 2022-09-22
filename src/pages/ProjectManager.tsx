import * as React from 'react';
import {Suspense, lazy} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ResponsiveAppbar from './Home-Nav';
import {authRequest} from '../api/baseUrl';
import {getSingleProjectApi} from '../api/projectApi'
import { useEffect, useState, useRef } from 'react';
import NewProject from '../components/project/NewProject';
import NewProjectTest from '../components/project/NewProjectTest';
import {AllProjectData, PayLoadNewProject, Result} from '../tscript/Project';
import {Customer} from '../tscript/Project'
import useDebounce from '../components/project/useDebounce';
import {getSingleProject} from '../features/ProjectReducer'
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
    const dispatch = useDispatch()
    // -------------GET ALL PROJECT-------------
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
    // ----------GET ALL CUSTOMERS--------
    const [customer, setCustomer] = useState<Customer[] | null>(null)
    const getAllCustomer = async () => {
        const response = await authRequest.get(`/api/services/app/Customer/GetAll`)
        setCustomer(response.data.result)
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

    const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        setProjectStatus(e.target.value)
        if (!e.target.value) {
            getAllProject({ status: "", search: searchFilter });
        } else {
        getAllProject({ status: e.target.value, search: searchFilter });
        }
    }
    
    const [searchFilter, setSearchFilter] = useState("")

    // const onFocus = () => {
    //     setFocused(true)
    // }
    // const onBlur = () => {
    //     setFocused(false)
    // }
    

    // -----------BIND INPUT DATA FOR API-----------
    const valueDebounce = useDebounce<string>(searchFilter, 500);
    useEffect(() => {
        getAllProject({ status: projectStatus, search: valueDebounce})
        getAllCustomer()
    },[valueDebounce])
    
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchFilter(e.target.value)
    }
    const [dataEdit, setDataEdit] = useState<PayLoadNewProject | null>(null)
    const [editProject, setEditProject] = useState<Partial<PayLoadNewProject>>({
        name: dataEdit?.name!,
        code: dataEdit?.code!,
        timeStart: dataEdit?.timeStart!,
        timeEnd: dataEdit?.timeEnd!,
        note: dataEdit?.note,
        projectType: dataEdit?.projectType!,
        projectTargetUsers: dataEdit?.projectTargetUsers!,
        customerId: dataEdit?.customerId!,
        isAllUserBelongTo: dataEdit?.isAllUserBelongTo!,
        tasks: dataEdit?.tasks!,
        users: dataEdit?.users!,
    })
    const [currentProject, setCurrentProject] = useState<null | number>(null)
    const handleEdit = (item: any) => {
        setCurrentProject(item.id)
    }
    React.useEffect(() =>{
        console.log('currentProject', currentProject)
        if(currentProject){
            const response = authRequest.get(`${getSingleProjectApi}?input=${currentProject}`)
            .then(response => {
                console.log('response.data single', response.data)
                setDataEdit(response.data)
            })
        }
    },[currentProject])
    return (
        <div className="ProjectManager">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            
            <div className='main-body main-project'>
                <h1>Project Manager</h1>
                <NewProject customer={customer} />
                {/* <NewProjectTest customer={customer} /> */}
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
                            onChange={(e) => handleSearchInput(e as any)}
                            
                            />
                    </FormControl>
                </Box>
        
                {transformProject(projects)?.map((item,index) => { 
                    return (
                    <div key={index}>
                            <div className='customer-name' style={{background: 'red', padding: '5px 0px 5px 10px',margin: '10px 0px 15px 0px', textAlign: 'left', textTransform: 'uppercase', fontWeight: 'bold', color: 'white'}}>
                                {item.customerName}
                            </div>
                            <div className='single-project'>
                                {item.data.map((data, index) => (
                                    <div key={index} className='project-name' style={{marginBottom: '10px'}}>
                                        <span style={{display: 'flex'}}>
                                        <span style={{color: 'black', fontSize:'16px'}}>{data.name}</span>
                                        <span style={{background: '#2E95EA'}}>{data.pms.join(', ')}</span>
                                        <span style={{background: 'red'}}>{data.activeMember} members</span>
                                        <span style={{background: '#4CAF50'}}><span style={{padding: '0px', margin: '0'}}>{dayjs(data.timeStart).format('DD/MM/YYYY')}</span> {data.timeEnd ? <span style={{padding: '0px', margin: '0'}}>- {dayjs(data.timeEnd).format('DD/MM/YYYY')}</span>:""}</span>
                                        
                                        <span className='active-status' style={{marginLeft: 'auto'}}>{data.status  ? <span style={{background: 'grey', paddingBottom: '3px'}}>InActive</span> 
                                                            : <span style={{background: '#4CAF50', paddingBottom: '3px'}}>Active</span>}</span>
                                        </span>
                                        <Button onClick={() => handleEdit(data)}>Edit</Button>
                                    </div>
                                ))}
                           
                            </div>
                        </div>  
                    ) ;
                }) } 
            </div>
        </div>
        
    )
}
export default ProjectManager;
