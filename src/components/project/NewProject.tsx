import * as React from 'react';
import {useEffect, useCallback} from 'react';
import {authRequest} from '../../api/baseUrl';
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
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
    Customer,
    getObjectById,
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


interface MembersPayload{
    userId: number;
    type: number
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
    const formatStartDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
    const formatEndDate = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
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
            userId: 0,
            type: 0  
        }]
        
    })
    
    // --------------TEAM TAB CONFIG--------------
    const [members, setMembers] = React.useState([] as any[])
    // const [userCheck, setUserCheck] = React.useState<UserNotPagging[] | null>(null);
    // const [userForm, setUserForm] = React.useState<UserFormNewProject[] | null>(null);
    // const [flagUserCheck, setFlagUserCheck] = React.useState({});
    // const [dataFilter, setDataFilter] = React.useState<DataFilterUser>({
    //     branch: { index: -1 },
    //     type: { index: -1 },
    //     level: { index: -1 },
    //     name: { nameString: "" },
    // });
    
    const [selectedMembers, setSelectedMembers] = React.useState([] as any[])
    const [arraySelected, setArraySelected] = React.useState([] as any[])
    const getAllMembers = async () => {
        await authRequest.get(`/api/services/app/User/GetUserNotPagging`)
        .then(response => {
            setMembers(response.data.result)
        }) 
    }
    // const [dataSelect, setDataSelect] = React.useState<{
    //     userId : number,
    //     type : number
    // } | null>(null)

    const handleAddMember = async (item: UserNotPagging) => {
        arraySelected.push(item)
        // console.log('arraySelected', arraySelected)
        // ----REMOVE ITEM FROM OLD ARRAY----
        const itemId = members.indexOf(item)            
        if(itemId > -1) {
            members.splice(itemId, 1);
        }
        // -------SET DATA-------
        
        setSelectedMembers([
            ...selectedMembers
            // {userId: item.id, type: typeValue}
        ])
    }
    let membersSelected: { userId: number; type: number }[] = [];
    const handleData = () => {
        arraySelected.forEach((member: UserNotPagging) =>
        membersSelected.push({
            userId: member.id,
            type:
            typeof member.type === "undefined" ? 1 : member.type,
        }),
    )
    }
    
    const [userId, setUserId] = React.useState<number | null>(null)
    const [typeValue, setTypeValue] = React.useState(1)
    const handleChangeOffice = (
        e: React.ChangeEvent<HTMLSelectElement>,
        userId: number
    ) => {
        setTypeValue(+e.target.value)
        // // console.log('dataSelect', dataSelect)
        
        // setSelectedMembers([...selectedMembers,
        //     {userId: userId, type: e.target.value}
        // ])
    };
    
    useEffect(() => {
        setNewProject({
            ...newProject,
            users: [...membersSelected]
        })
        console.log('membersSelected', membersSelected)
        console.log('arraySelected', arraySelected)
    }, [
        // membersSelected,
        typeValue])

    
    useEffect(() =>{
        // console.log('new project', newProject)
    },[newProject])

    useEffect(() => { 
        getAllMembers()
    },[])
    
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
                <Button onClick={handleData}>render</Button>

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
                            
                            {/* <ul>
                            {arraySelected.map((item: any, index) => (
                                <li key={item.id}>
                                    <h4>{item.name}</h4> */}
                                    {selectedMembers.map((item, id) => (
                                    <Box sx={{ minWidth: 120 }} key={item.id} >
                                        <h4>member: {item.id}</h4>
                                    <FormControl fullWidth>
                                        <InputLabel>Type</InputLabel> 
                                        <Select
                                        value={item.type}
                                        label="type"
                                        onChange={(e) => {
                                            console.log('item', item)
                                            // handleChangeOffice(e.target?.value as any, item.id, item!);
                                            handleChangeOffice(e as any, item.id)
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
                                {/* </li>
                            ))}   
                            </ul> */}
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