import * as React from 'react';
import {useState, useEffect} from 'react';
import { getAllTask } from '../../tscript/Task';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';import Input from '@mui/material/Input';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// -------typescrip import--------
import {dataTaskForm} from '../../tscript/Task'

interface arrayProps{
    title: any[],
    setTitle: (arg:any[]) => void,
    // taskEdit: dataTaskForm | null
    
} 
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
export default function NewTask({title, setTitle}:arrayProps) {
    const [open, setOpen] = React.useState(false);
    const [dataNewTask, setDataNewTask] = useState<Partial<dataTaskForm>>({
        name: "",
        type: 0,
        isDeleted: true
    })
    // -----------ALERT------------
    const [success, setSuccess] = useState(false)
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false)
    };
    // ---------HANDLE----------
    const handleSubmitTask = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        await getAllTask.post(`/api/services/app/Task/Save`, dataNewTask)
            .then(response =>{
                setSuccess(true)
            })
            // -----close dialog box------
            if (reason !== 'backdropClick') {
                setOpen(false);
            }
            // --------Update new task in client--------
            getAllTask.get(`/api/services/app/Task/GetAll`)
            .then(response => {
                setTitle(response.data.result)
                console.log('set new task')
                
            })
    }
    // const [taskEdit, setTaskEdit] = useState<dataTaskForm | null>(null);
    // const handleClickEdit = (task: dataTaskForm) => {
    //     setTaskEdit(task);
    //     setOpen(true);
    //   };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
        setOpen(false);
        }
    };

    return (
        <div>
        <Button onClick={handleClickOpen} variant='outlined'>+ ADD NEW TASK</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>

            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    
                    <TextField
                        autoFocus
                        variant='outlined'
                        label='Input task name'
                        name="name"
                        value={dataNewTask.name}
                        onChange={(e) =>
                        setDataNewTask({
                            ...dataNewTask,
                            [e.target.name]: e.target.value,
                        })
                        }
                    />
                    <span style={{textAlign: 'left', margin: '15px 0px 10px 0px'}}>Select task type</span>
                    <Select
                        autoWidth
                        value={dataNewTask.type}
                        onChange={(e) => {
                            setDataNewTask({...dataNewTask,type: +e.target.value})
                        }}
                    >
                        <MenuItem  value={0}>Common Task</MenuItem>
                        <MenuItem  value={1}>Other Task</MenuItem>
                        
                    </Select>
                </FormControl>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmitTask}>Add</Button>
            </DialogActions>
           
        </Dialog>
        <div>
        {success ? <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseAlert} >
                            <Alert severity="success" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                                Add New Task Success!
                            </Alert>
                        </Snackbar> 
                        : <></>}
        </div>
        </div>
    );
}