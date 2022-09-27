import * as React from 'react';
import {useSelector} from 'react-redux';
import { taskSelector } from '../../features/TasksReducer';
import Tasks from './NewProjectSlice/Tasks'
import {useEffect, useCallback,useState} from 'react';
import {authRequest} from '../../api/baseUrl';
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
import useDebounce from '../../components/project/useDebounce';
import {
    checkBranch, 
    checkTypeMember,
    UserNotPagging, 
    Customer,
    DataFilterUser,
    dataBranch,
    dataTypeUser,
    dataLevel,
    mergeObjectUserForm,
    mergeObjectById,
    UserFormNewProject,
    filterUser,
deleteArrInArrById,
deleteArrRemoveUserForm,
PayLoadNewProject,
TaskFormNewProject } from '../../tscript/Project';
// ---------IMPORT SPLIDEJS----------
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '../../css/NewProject.css'
// ------------IMPORT DAYJS-------------
import dayjs from 'dayjs';

export interface GeneralProps{
    customer: Customer[] | null;
}
export interface TeamProps{
    users: UserNotPagging[] | null;
    setUsers: (params: UserNotPagging[]) => void;
    userDefaultValues?: UserFormNewProject[];
    setValue: UseFormSetValue<Partial<PayLoadNewProject>>;
}
export default function NewProject({customer}:GeneralProps, {users, setUsers}:TeamProps){
    // --------MUI DIALOG-----------
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setRender(false)
        setOpen(false);
    };
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    // -------------GENERAL TAB - NEW PROJECT CONFIG--------------
    const [newProject, setNewProject] = React.useState<Partial<PayLoadNewProject>>({
        name: "",
        code: "",
        timeStart: "",
        timeEnd: "",
        note: "",
        projectType: 1,
        projectTargetUsers: [],
        customerId: 0,
        isAllUserBelongTo: false,
        tasks: [{
            taskId: 0,
            billable: true
        }],
        users: [{
            userId: 0,
            type: 0  
        }]
    })
    // --------------TEAM TAB CONFIG--------------
    const [dataFilter, setDataFilter] = useState<DataFilterUser>({
        branch: { index: -1 },
        type: { index: -1 },
        level: { index: -1 },
        name: { nameString: "" },
      });
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

    useEffect(() =>{
        console.log('new project', newProject)
    },[newProject])

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
            await authRequest.post(`/api/services/app/Project/Save`,newProject)
            .then(response => {
                console.log(response)
            })
        }
        catch (error) {
            console.log(error)
        }
        setOpen(false)
        setRender(false)
        
    }
    const taskData = useSelector(taskSelector)
    useEffect(() => {
        setNewProject({
            ...newProject, 
            tasks: taskData.tasks,
            timeStart: startDateFormat!,
            timeEnd: endDateFormat!,
            users: selectedMembers!,
        })
    },[taskData.tasks])
    return( 
        <div className='new-project'>
            <Button variant="contained" color='success' onClick={handleClickOpen}>
                Create Project
            </Button>
            <Dialog 
                sx={{height: '100vh'}}
                maxWidth={maxWidth}
                open={open} onClose={handleClose}>
                <DialogTitle>Create New Project </DialogTitle>      
                <DialogContent sx={{margin: '10px !important',height: '97vh'}}>
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
                                value={newProject.customerId}
                                label="Client"
                                onChange={(e) => {
                                    setNewProject({...newProject, customerId: +e.target.value})
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
                                    value={newProject.name}
                                    onChange={(e) => {
                                        setNewProject({
                                            ...newProject,
                                            [e.target.name]: e.target.value,
                                        })
                                    }}
                                    />
                                <h4 style={{margin: '10px 0px'}}>Project Code*</h4>
                                <TextField 
                                    label='Project Code'
                                    value={newProject.code}
                                    name='code'
                                    onChange={(e) => {
                                        setNewProject({
                                            ...newProject,
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
                                    value={newProject.note}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
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
                                    value={newProject.projectType}  
                                    label="projectType"
                                    onChange={(e) => {
                                        setNewProject({...newProject, projectType: +e.target.value})
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
                            <div style={{display: 'flex'}}>
                                <Box>
                                <InputLabel >Branch</InputLabel>
                                <Select
                                    variant='standard'
                                    value={dataFilter.branch.index}
                                    label='Branch'
                                    onChange={(e) => {
                                        setDataFilter({
                                        ...dataFilter,
                                        branch: { index: +e.target.value },
                                        });
                                        setRender(true)
                                    }}
                                    >
                                    <MenuItem value={-1}>All</MenuItem>
                                    {dataBranch.map((branch, index) => (
                                        <MenuItem value={branch.branch} key={index}>
                                        {branch.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                </Box>
                                <Box sx={{margin: '0px 15px'}}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    variant='standard'
                                    value={dataFilter.type.index}
                                    onChange={(e) => {
                                        setDataFilter({
                                        ...dataFilter,
                                        type: { index: +e.target.value },
                                        });
                                        setRender(true)
                                    }}
                                    >
                                    <MenuItem value={-1}>All</MenuItem>
                                    {dataTypeUser.map((data, index) => (
                                        <MenuItem value={data.type} key={index}>
                                        {data.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    </Box>
                                    <Box>
                                    <InputLabel>Level</InputLabel>
                                    <Select
                                    variant='standard'
                                    value={dataFilter.level.index}
                                    onChange={(e) => {
                                        setDataFilter({
                                        ...dataFilter,
                                        level: { index: +e.target.value },
                                        });
                                        setRender(true)
                                    }}
                                    >
                                    <MenuItem value={-1}>All</MenuItem>
                                    {dataLevel.map((data, index) => (
                                        <MenuItem value={data.level} key={index}>
                                        {data.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    </Box>
                                    <Box sx={{marginLeft: '50px'}}>
                                    <InputLabel>Search by name</InputLabel>
                                    <TextField variant='standard' onChange={(e) => {
                                        setDataFilter({
                                        ...dataFilter,
                                        name: { nameString: e.target.value },
                                        });
                                    }} /></Box>
                                </div>
                            <ul>
                                <Button onClick={handleRenderMembers} >
                                    <PeopleAltIcon />
                                    <span style={{fontSize: '16px', marginLeft: '10px', textTransform: 'capitalize'}}>Show Members</span>
                                </Button>
                                {filterUser(members)(dataFilter.branch.index)(dataFilter.type.index)(
                                    dataFilter.level.index)(dataFilter.name.nameString)?.map((item, index) => (
                                    <li key={index} style={{margin: '10px 0px', display: 'flex'}}>
                                        <IconButton onClick={() => handleAddMember(item)}color='primary' style={{marginRight: '15px'}}>
                                            <AddCircleIcon sx={{fontSize: '30px'}}/>
                                        </IconButton>
                                        <div style={{paddingTop: '5px'}}>
                                            <h4 style={{display: 'inline-block'}}>{item.name}</h4>
                                            {checkBranch(item.branch) ?  <span style={{background: 'lightGreen',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>
                                                                            {checkBranch(item.branch)}</span> 
                                                                        : ""}
                                            
                                            
                                            {checkTypeMember(item.type)? <span style={{background: 'lightSalmon',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>{checkTypeMember(item.type)}</span> : ""}
                                        </div>
                                    </li>
                                )) }
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