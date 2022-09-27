import * as React from 'react';
import {useSelector} from 'react-redux';
import { taskSelector } from '../../../features/TasksReducer';
import Tasks from '../NewProjectSlice/Tasks'
import {useEffect, useCallback,useState} from 'react';
import {authRequest} from '../../../api/baseUrl';
import {useForm,SubmitHandler, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddCircleIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import  { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker}  from '@mui/x-date-pickers/DatePicker';
import {
    checkBranch, 
    checkTypeMember,
    UserNotPagging, 
    Customer,
    mergeObjectUserForm,
    mergeObjectById,
    UserFormNewProject,
    filterUser,
deleteArrInArrById,
deleteArrRemoveUserForm,
PayLoadNewProject,
TaskFormNewProject, Result, DataSingleProject } from '../../../tscript/Project';
import {getSingleProject} from '../../../features/ProjectReducer';
import {getSingleProjectApi} from '../../../api/projectApi'
// ---------IMPORT SPLIDEJS----------
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '../../../css/NewProject.css'
// ------------IMPORT DAYJS-------------
import dayjs from 'dayjs';

export interface GeneralProps{
    customer: Customer[] | null;
    currentProject: null | number;
    setCurrentProject: (params: number) => void;
    dataProject: DataSingleProject
}
export interface TeamProps{
    users: UserNotPagging[] | null;
    setUsers: (params: UserNotPagging[]) => void;
    userDefaultValues?: UserFormNewProject[];
    setValue: UseFormSetValue<Partial<PayLoadNewProject>>;
}
export default function EditProject({customer, currentProject, setCurrentProject, dataProject}:GeneralProps){
    // --------MUI DIALOG-----------
    const [openEdit, setOpenEdit] = React.useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('lg');
    const handleClickOpen = () => {
        setOpenEdit(true);
    };
    const handleClose = () => {
        setRender(false)
        setOpenEdit(false);
    };
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    // -------------GENERAL TAB - NEW PROJECT CONFIG--------------
    const [dataEdit, setDataEdit] = useState<PayLoadNewProject | null>(null)
    
    
    const handleEdit = (item: any) => {
        setCurrentProject(item.id)
        setOpenEdit(true)
    }
    // useEffect(() =>{
        
    //     // if(currentProject){
    //     //     const response = authRequest.get(`${getSingleProjectApi}?input=${currentProject}`)
    //     //     .then(response => {
    //     //         console.log('response.data single', response.data)
    //     //         setDataEdit(response.data)
    //     //     })
    //     // }
    // },[currentProject])
    // console.log('currentProject', currentProject)
    
    // --------------TEAM TAB CONFIG--------------
    const [members, setMembers] = React.useState([] as any[])
    const [selectedMembers, setSelectedMembers] = React.useState<UserFormNewProject[] | null>(null);
    const [arraySelected, setArraySelected] = React.useState<UserNotPagging[] | null>(null)
   
    const [render, setRender] = React.useState(false)
    const handleRenderMembers = async () => {
        await authRequest.get(`/api/services/app/User/GetUserNotPagging`)
        .then(response => {
            setMembers(response.data.result)
        }) 
        console.log('getuser')
        setRender(true)
    }
    const handleAddMember = (item: UserNotPagging) => {
        if(!arraySelected){
            setArraySelected([item])
        }else{
            setArraySelected([...arraySelected, item])
        }
        if (!selectedMembers) {
            setSelectedMembers([{ userId: item.id, type: 1 }]);
        } else {
            setSelectedMembers([...selectedMembers!, { userId: item.id, type: 0 }]);
        }
        // ----REMOVE ITEM FROM OLD ARRAY----
        const itemId = members.indexOf(item)            
        if(itemId > -1) {
            members.splice(itemId, 1);
        }
    }
    const handleChangeType = (
        e: React.ChangeEvent<HTMLSelectElement>,
        userId: number
    ) => {
        setSelectedMembers(
            mergeObjectUserForm(selectedMembers!)({ userId, type: +e.target.value })
        )
    };
   
    const handleRemove = (item: UserNotPagging) => {
        setArraySelected(
            deleteArrInArrById(arraySelected as UserNotPagging[], [item])!);
        setSelectedMembers(
            deleteArrRemoveUserForm(selectedMembers as UserFormNewProject[])(item.id)
        );
    }
    
    // -------------SUBMIT-------------
    const startDateFormat = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    const endDateFormat = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    
    const handleSubmitProject = async (event: React.SyntheticEvent<unknown>, reason?: string) =>{
        try {
            await authRequest.post(`/api/services/app/Project/Save`,editProject)
            .then(response => {
                console.log(response)
            })
        }
        catch (error) {
            console.log(error)
        }
        setOpenEdit(false)
        setRender(false)
        
    }
    const taskData = useSelector(taskSelector)
    useEffect(() => {
        setEditProject({
            ...editProject, 
            tasks: taskData.tasks,
            timeStart: startDateFormat!,
            timeEnd: endDateFormat!,
            users: selectedMembers!,
        })
    },[taskData.tasks])
    useEffect(() => {
        if(currentProject){
            authRequest.get(`/api/services/app/Project/Get?input=${currentProject}`)
            .then(response => {
                setDataEdit(response.data.result)
                setEditProject(response.data.result)
            })
        }
    },[openEdit])
    
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
    useEffect(() => {
        console.log('dateEdit', dataEdit)
        console.log('editProject', editProject)                          
    })
    
    return( 
        <div className='new-project'>
            <Button color='primary' onClick={() => {
                setCurrentProject(dataProject.id);
                setOpenEdit(true)
                }}>
                Edit Project
            </Button>
            <Dialog 
                sx={{height: '100vh'}}
                maxWidth={maxWidth}
                open={openEdit} onClose={handleClose}>
                <DialogTitle>Edit Project</DialogTitle>      
                <DialogContent >
                    <div className="splide__progress">
                        <div className="splide__progress__bar" />
                    </div>
                    <Splide 
                        hasTrack={ false } 
                        aria-label="..." 
                        options={ {
                            drag: false
                        } }>
                    <SplideTrack>
                    <SplideSlide style={{paddingTop: '10px'}}>
                        <Box sx={{ minWidth: 120 }}>
                            <h4 style={{margin: '10px 0px'}}>Choose Client*</h4>
                            <FormControl fullWidth>
                                
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={editProject.customerId}
                                label="Client"
                                onChange={(e) => {
                                    setEditProject({...editProject, customerId: +e.target.value})
                                }}
                                >
                                    {customer?.map((item:any) => (
                                        <MenuItem 
                                        value={item.id}
                                        key={item.id}
                                        > {item.name} </MenuItem>
                                    ))}
                                </Select>
                                <h4 style={{margin: '10px 0px'}}>Project Name*</h4>
                                <TextField
                                    name='name'
                                    label="Project Name"
                                    value={
                                        editProject.name
                                    }
                                    onChange={(e) => {
                                        setEditProject({
                                            ...editProject,
                                            [e.target.name]: e.target.value,
                                        })
                                    }}
                                    />
                                <h4 style={{margin: '10px 0px'}}>Project Code*</h4>
                                <TextField 
                                    label='Project Code'
                                    value={editProject.code}
                                    name='code'
                                    onChange={(e) => {
                                        setEditProject({
                                            ...editProject,
                                            [e.target.name]: e.target.value,
                                        })
                                    }}
                                />
                                <h4 style={{margin: '10px 0px'}}>Dates*</h4>
                                <div style={{display: 'flex'}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    </LocalizationProvider>
                                    <div style={{display: 'flex', alignItems:'center', margin: '0px 10px '}}>to</div>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    </LocalizationProvider>
                                </div>
                                <h4 style={{margin: '10px 0px'}}>Note*</h4>
                                <TextField 
                                    label='Note'
                                    name='note'
                                    value={editProject.note}
                                    onChange={(e) =>
                                        setEditProject({
                                            ...editProject,
                                            [e.target.name]: e.target.value,
                                        })
                                        } 
                                />
                                <h4 style={{margin: '10px 0px'}}>Project Type*</h4>
                                <FormControl>
                                <InputLabel id="demo-select-small">Project Type</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={editProject.projectType}  
                                    label="projectType"
                                    onChange={(e) => {
                                        setEditProject({...editProject, projectType: +e.target.value})
                                    }}
                                >
                                    <MenuItem value={0}>Time-Materials</MenuItem>
                                    <MenuItem value={1}>Fixed Fee</MenuItem>
                                    <MenuItem value={2}>Non-Billable</MenuItem>
                                    <MenuItem value={3}>ODC</MenuItem>
                                </Select>
                                </FormControl>
                            </FormControl>
                        </Box>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="selected-list">
                            <h3 style={{margin: '10px 0px', height:'30px', borderBottom:'1px solid lightGrey'}}>Team Members</h3>
                            {mergeObjectById(arraySelected!)(selectedMembers!)?.map((item, index) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', height: '50px' }} 
                                key={index}
                                >
                                    <IconButton onClick={() => handleRemove(item)} color='error'>
                                        <CloseIcon sx={{fontSize: '26px'}} />
                                    </IconButton>
                                    <h4 style={{marginRight: '50px'}}>{item.name}</h4>
                                    <FormControl variant='standard'>
                                        <Select
                                        value={item.typeOffice}
                                        placeholder="type"
                                        onChange={(e) => {
                                            handleChangeType(e as any, item.id)
                                        }}
                                        > 
                                            <MenuItem value={0}>Member</MenuItem>
                                            <MenuItem value={1}>PM</MenuItem>
                                            <MenuItem value={2}>Shadow</MenuItem>
                                            <MenuItem value={3}>Deactive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            ))}
                            
                        </div>
                        <div className="members-list">
                            <h3 style={{margin: '10px 0px', height:'30px', borderBottom:'1px solid lightGrey'}}>Members List</h3>
                            <ul>
                                <Button onClick={handleRenderMembers} >
                                    <PeopleAltIcon />
                                    <span style={{fontSize: '16px', marginLeft: '10px', textTransform: 'capitalize'}}>Show Members</span>
                                </Button>
                                {render ? members?.map((item) => (
                                    <li key={item.id} style={{margin: '10px 0px', display: 'flex'}}>
                                        <IconButton onClick={() => handleAddMember(item)}color='primary' style={{marginRight: '15px'}}>
                                            <AddCircleIcon sx={{fontSize: '30px'}}/>
                                        </IconButton>
                                        <div style={{paddingTop: '5px'}}>
                                            <h4 style={{display: 'inline-block'}}>{item.name}</h4>
                                            {checkBranch(item.branch) ?  <span style={{background: 'lightGreen',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>
                                                                            {checkBranch(item.branch)}</span> 
                                                                        : ""}
                                            
                                            
                                            {checkTypeMember(item.type)? <span style={{background: 'lightSalmon',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>{checkTypeMember(item.type)}</span> : ""}
                                            
                                            <div><em>{item.emailAddress}</em></div>
                                        </div>
                                    </li>
                                )) : ''}
                            </ul>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <Tasks />
                    </SplideSlide>
                    </SplideTrack>
                    </Splide>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmitProject}>Create</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}