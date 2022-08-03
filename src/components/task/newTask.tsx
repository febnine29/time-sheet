import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
    const [age, setAge] = React.useState<number | string>('');
    const [dataNewTask, setDataNewTask] = useState<Partial<dataTaskForm>>({
        name: "",
        type: 0,
        isDeleted: false,
    })

    // const handleChange = (event: SelectChangeEvent<typeof age>) => {
    //     setAge(Number(event.target.value) || '');
    // };

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
        <Button onClick={handleClickOpen}>Open select dialog</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Fill the form</DialogTitle>
            <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                    <Input
                        name="name"
                        value={dataNewTask.name}
                        onChange={(e) =>
                        setDataNewTask({
                            ...dataNewTask,
                            [e.target.name]: e.target.value,
                        })
                        }
                        style={{marginTop: '10px'}}
                    />
                    <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={age}
                        onChange={(e) => {
                            setDataNewTask({ ...dataNewTask, type: +e.target.value })
                        }}
                        input={<OutlinedInput label="Age" />}
                    >
                        <MenuItem selected={dataNewTask?.type! === 0} value={0}>Common Task</MenuItem>
                        <MenuItem selected={dataNewTask?.type! === 1} value={1}>Other Task</MenuItem>
                        
                    </Select>
                </FormControl>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}