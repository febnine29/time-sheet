import * as React from 'react';
import dayjs from 'dayjs';
import ResponsiveAppbar from './Home-Nav';
import {authRequest} from '../api/baseUrl'
import { useEffect } from 'react';
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
function ProjectManager({isLogin, setIsLogin}: LogoutProps){

    const [projects, setProjects] = React.useState([])
    const getAllProject = async (data?: getProjectProps) => {
        const {status = "", search = ""} = data!;
        try{
            const response = await authRequest.get(`/api/services/app/Project/GetAll?status=${status}&search=${search}`);
            setProjects(response.data.result)
            // dayjs().format(response.data.result.timeEnd)
        }
        catch (error){
            console.log(error)
        } 
    }
    useEffect(() => {
        getAllProject({ status: "", search: ""})
        console.log(projects)
    },[])
    
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
    
    
    return (
        <div className="ProjectManager">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            <div className='main-body main-project'>

                <h1>Project Manager</h1>
                <NewProject />
                {transformProject(projects)?.map((item,index) => {
                    return (
                        <div key={index}>
                            <div className='customer-name' style={{background: 'darkCyan'}}>{item.customerName}</div>
                            <div className='single-project'>
                                {item.data.map((data, index) => (
                                    
                                    <div key={index} className='project-name' style={{marginBottom: '10px'}}>
                                        <span style={{display: 'flex'}}>
                                        <span style={{color: 'black', fontSize:'16px'}}>{data.name}</span>
                                        <span style={{background: '#2E95EA'}}>{data.pms}</span>
                                        <span style={{background: 'red'}}>{data.activeMember} members</span>
                                        <span style={{background: '#4CAF50'}}> {dayjs(data.timeStart).format('DD/MM/YYYY')}{data.timeEnd ? <span>- {dayjs(data.timeEnd).format('DD/MM/YYYY')}</span> : ""}</span>
                                        <span>{data.status ? <span style={{background: 'grey'}}>Inactive</span> 
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
