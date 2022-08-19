import * as React from 'react';
import {authRequest} from '../../api/baseUrl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import  { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker}  from '@mui/x-date-pickers/DatePicker';
import {Customer} from '../../tscript/Project';
import {checkBranch, checkTypeMember} from '../../tscript/Project' 
// ---------IMPORT SPLIDEJS----------
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '../../css/NewProject.css'
// ------------IMPORT DAYJS-------------
import dayjs from 'dayjs';

export interface GeneralProps{
    customer: Customer[] | null
}
export interface TaskFormNewProject {
    taskId: number;
    billable: boolean;
    id?: number;
}
export interface UserFormNewProject {
    userId: number;
    type: number;
    id?: number;
}
export interface ProjectFormNew{
    userId: number,
    roleName: string,
    id?: number
}
interface PayLoadNewProject{
    name: string;
    code: string;
    status: number;
    timeStart: string;
    timeEnd: string;
    note: string;
    projectType: number;
    customerId: number;
    tasks: TaskFormNewProject[];
    users: UserFormNewProject[];
    projectTargetUsers: ProjectFormNew[];
    isAllUserBelongTo: boolean;
    komuChannelId: string,
    isNotifyToKomu: boolean,
    id: number;

}
export default function NewProject({customer}:GeneralProps){
    // --------MUI DIALOG-----------
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    // let stringDate = startDate?.toString()
    const formatStartDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
    // let stringDate = convertStartDate?.toString()
    const formatEndDate = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
    // console.log('startDate', formatStartDate)
    // -------------GENERAL TAB - NEW PROJECT CONFIG--------------
    const [newProject, setNewProject] = React.useState<Partial<PayLoadNewProject>>({
        name: "",
        code: "",
        status: 0,
        timeStart: "",
        timeEnd: "",
        note: "",
        projectType: 0,
        customerId: 1,
        id: 0,
        tasks: [{
            taskId: 0,
            billable: true,
            id: 0
        }],
        users: [{
            userId: 0,
            type: 0
        }]
    })
    // --------------TEAM TAB CONFIG--------------
    const [members, setMembers] = React.useState([] as any[])
    const getAllMembers = async () => {
        await authRequest.get(`/api/services/app/User/GetUserNotPagging`)
        .then(response => {
            setMembers(response.data.result)
            console.log(members)
        })
    }
    React.useEffect(() => {
        getAllMembers()
    },[])
    // -------------SUBMIT-------------
    const handleSubmitProject = async () =>{
        const startDateFormat = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
        const endDateFormat = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
        setNewProject({
            ...newProject,
            timeStart : startDateFormat!,
            timeEnd : endDateFormat!,
        })
        // await authRequest.post(`/api/services/app/Project/Save`)
        // .then(response => {
        //     console.log(response)
        // })
    }
    console.log('new project', newProject)
    return( 
        <div className='new-project'>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create A Project
            </Button>
            <Dialog 
            // fullWidth={fullWidth}
            sx={{height: '100vh'}}
            maxWidth={maxWidth}
            open={open} onClose={handleClose}>
                <DialogTitle>Create New Project </DialogTitle>
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
                                <button onClick={handleSubmitProject}>Save</button>
                            </FormControl>
                        </Box>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="selected-list">
                            <h3 style={{margin: '10px 0px'}}>Team Members</h3>
                        </div>
                        <div className="members-list">
                            <h3 style={{margin: '10px 0px'}}>Members List</h3>
                            <ul>
                                {members?.map((member) => (
                                    <li key={member.id} style={{margin: '10px 0px', display: 'flex'}}>
                                        <Button color="primary" variant='contained' style={{marginRight: '15px'}}>Add</Button>
                                        <div style={{paddingTop: '5px'}}>
                                            <h4 style={{display: 'inline-block'}}>{member.name}</h4>
                                            {checkBranch(member.branch) ?  <span style={{background: 'lightGreen',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>
                                                                            {checkBranch(member.branch)}</span> 
                                                                        : ""}
                                            
                                            
                                            {checkTypeMember(member.type)? <span style={{background: 'lightSalmon',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>{checkTypeMember(member.type)}</span> : ""}
                                            
                                            <div><em>{member.emailAddress}</em></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SplideSlide>
                    <SplideSlide>test3</SplideSlide>
                    </SplideTrack>
                    
                    </Splide>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}