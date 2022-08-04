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
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// -------typescrip import--------
import {dataTaskForm} from '../../tscript/Task'


export default function NewTask() {
    const [open, setOpen] = React.useState(false);
    const [dataNewTask, setDataNewTask] = useState<Partial<dataTaskForm>>({
        name: "",
        type: 0,
        isDeleted: false
    })
    
    const handleSubmitTask = (event: React.SyntheticEvent<unknown>, reason?: string) => {
       
            getAllTask.post(`/api/services/app/Task/Save`, dataNewTask)
            .then(response =>{
                console.log('saved success', response);
                
            })
            if (reason !== 'backdropClick') {
                setOpen(false);
            }
    }
    
    console.log('newtask', dataNewTask)
    // const handleDelTask = (id:any) => {
    //         getAllTask.post(`/api/services/app/Task/Save`, dataNewTask)
    //         const del = [...title];
    //         del.splice(id, 1);
    //         setTitle(del) 
            
    // }

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
        <Button onClick={handleClickOpen} variant='outlined'>Open select dialog</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>

            <DialogTitle>Add new task</DialogTitle>
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
                    <Select
                        labelId="demo-dialog-select-label"
                        label="Task type"
                        id="demo-dialog-select"
                        value={dataNewTask}
                        onChange={(e) => {
                            setDataNewTask({...dataNewTask,type: +e.target.value})
                        }}
                    >
                        <MenuItem  value={0}>0</MenuItem>
                        <MenuItem  value={1}>1</MenuItem>
                        
                    </Select>
                </FormControl>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmitTask}>Add</Button>
            </DialogActions>
           
        </Dialog>
        </div>
    );
}