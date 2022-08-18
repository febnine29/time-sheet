import * as React from 'react';

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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import  { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker}  from '@mui/x-date-pickers/DatePicker';
import {Customer} from '../../tscript/Project'
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
    // -------------NEW PROJECT CONFIG--------------
    const [newProject, setNewProject] = React.useState<Partial<PayLoadNewProject>>({
        name: "",
        code: "",
        status: 0,
        timeStart: "",
        timeEnd: "",
        note: "",
        projectType: 0,
        customerId: 0,
        id: 0
    })
    
    
    const handleSubmitProject = () =>{
        const startDateFormat = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
        const endDateFormat = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
        setNewProject({
            ...newProject,
            timeStart : startDateFormat!,
            timeEnd : endDateFormat!,
        })
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
                                            // const startDateFormat = dayjs(value).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
                                            // setNewProject({
                                            //     ...newProject,
                                            //     timeStart : startDateFormat!
                                            // });
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
                                            // console.log(startDate)
                                            // const formatDate=dayjs(e.target.value).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
                                            
                                            // setNewProject(formatDate);
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
                                
                            </FormControl>
                        </Box>
                    </SplideSlide>
                    <SplideSlide>test2</SplideSlide>
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