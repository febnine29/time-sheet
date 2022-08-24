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
import {
    checkBranch, 
    checkTypeMember,
    UserNotPagging, 
    DataFilterUser,
    Customer } from '../../tscript/Project';

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
}

export interface TaskFormNewProject {
    taskId: number;
    billable: boolean;
    id?: number;
}
export interface UserFormNewProject {
    userId: number;
    type: number;
    isTemp: boolean;
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
    projectTargetUsers: [];
    isAllUserBelongTo: boolean;
    // komuChannelId: string;
    // isNotifyToKomu: boolean;
    id: number;

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
        name: "ASDVXZBNXs",
        code: "VXCXCZXX",
        timeStart: "",
        timeEnd: "",
        note: "none",
        projectType: 1,
        projectTargetUsers: [],
        customerId: 10111,
        isAllUserBelongTo: false,
        tasks: [{
            taskId: 520,
            billable: true
        }],
        users: [{
            userId: 9,
            type: 1,
            isTemp: false     
        }]
        
    })
    // --------------TEAM TAB CONFIG--------------
    const [members, setMembers] = React.useState([] as any[])
    const [userCheck, setUserCheck] = React.useState<UserNotPagging[] | null>(null);
    const [userForm, setUserForm] = React.useState<UserFormNewProject[] | null>(null);
    const [flagUserCheck, setFlagUserCheck] = React.useState({});
    const [dataFilter, setDataFilter] = React.useState<DataFilterUser>({
        branch: { index: -1 },
        type: { index: -1 },
        level: { index: -1 },
        name: { nameString: "" },
    });
    const [selectedMembers, setSelectedMembers] = React.useState([] as any[])

    const getAllMembers = async () => {
        await authRequest.get(`/api/services/app/User/GetUserNotPagging`)
        .then(response => {
            setMembers(response.data.result)
        }) 
    }
    // const mergeObjectById = (array1: UserNotPagging[]) => (
    //     array2: UserFormNewProject[]
    // ): (UserNotPagging & { typeOffice: number })[] | null => {
    //     if (!array1 || !array2) return null;

    //     return array1.map((itemArr1) => {
    //     let result!: UserNotPagging & { typeOffice: number };
    //     for (let item of array2) {
    //         if (itemArr1.id === item?.userId) {
    //         result = { ...itemArr1, typeOffice: item.type };
    //         }
    //     }
    //     return result;
    //     });
    // };
    const handleAddMember = (item: UserNotPagging) => {
        console.log('item click', item)
        selectedMembers.push(item)
        // ----Reload selectedMembers-----
        setSelectedMembers([...selectedMembers])
        // ------Set Data to api-----
        setNewProject({
            ...newProject,
            users: selectedMembers
        })
        console.log('selected members', selectedMembers)
        // const newArray = members.filter((item) => item.id != item);
        // setMembers(newArray);
        const itemId = members.indexOf(item)
        if(itemId > -1) {
            members.splice(itemId, 1);
        }
    };
    React.useEffect(() => {
        getAllMembers()
    },[])
    const handleRemoveMembers = (id: any) => {

    }

    // -------------SUBMIT-------------
    const handleSubmitProject = async (event: React.SyntheticEvent<unknown>, reason?: string) =>{
        const startDateFormat = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const endDateFormat = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        setNewProject({
            ...newProject,
            timeStart : startDateFormat!,
            timeEnd : endDateFormat!,
        })
        try {
            await authRequest.post(`/api/services/app/Project/Save`,newProject)
            .then(response => {
                console.log(response)
            })
        }
        catch (error) {
            console.log(error)
        }
        
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
                                <button onClick={(e) => handleSubmitProject(e as any)}>Save</button>
                            </FormControl>
                        </Box>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="selected-list">
                            <h3 style={{margin: '10px 0px'}}>Team Members</h3>
                            {/* {mergeObjectById(userCheck!)(userForm!)?.map((item, index) => (
                                <li key={index}>
                                    <h4>{item.name}</h4>
                                    <button onClick={(e) => handleRemoveMembers(index)}>delete</button>

                                </li>
                            ))} */}
                            {selectedMembers.map((item, index) => (
                                <ul>
                                    <li key={index}>
                                        <h4>{item.name}</h4>
                                        <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={newProject.users.type}
                                            label="type"
                                            onChange={(e) => {
                                                // setNewProject({...newProject, type: +e.target.value})
                                            }}
                                            >
                                            <MenuItem value={0}>Member</MenuItem>
                                            <MenuItem value={1}>PM</MenuItem>
                                            </Select>
                                        </FormControl>
                                        </Box>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className="members-list">
                            <h3 style={{margin: '10px 0px'}}>Members List</h3>
                            <ul>
                                {members?.map((item) => (
                                    <li key={item.id} style={{margin: '10px 0px', display: 'flex'}}>
                                        <Button onClick={() => handleAddMember(item)} color="primary" variant='contained' style={{marginRight: '15px'}}>Add</Button>
                                        <div style={{paddingTop: '5px'}}>
                                            <h4 style={{display: 'inline-block'}}>{item.name}</h4>
                                            {checkBranch(item.branch) ?  <span style={{background: 'lightGreen',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>
                                                                            {checkBranch(item.branch)}</span> 
                                                                        : ""}
                                            
                                            
                                            {checkTypeMember(item.type)? <span style={{background: 'lightSalmon',margin: '0px 3px', padding: '0px 7px 2px 7px', borderRadius: '12px', fontSize: '13px'}}>{checkTypeMember(item.type)}</span> : ""}
                                            
                                            <div><em>{item.emailAddress}</em></div>
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