import * as React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppbar from './Home-Nav';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NewTask from '../components/task/NewTask';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';import Input from '@mui/material/Input';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {getAllTask} from '../tscript/Task';
import {dataTaskForm} from '../tscript/Task';
import {useSelector, useDispatch} from 'react-redux';
import { dataTaskConfirm, confirmSelector } from '../features/ConfirmTask';
// import {handleClickEdit} from '../components/task/NewTask';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
export interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean;
    // taskEdit: dataTaskForm | null
}

// ---------MUI---------------
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
props,
ref,
) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TaskManager({
    isLogin, 
    setIsLogin,
    // taskEdit
}: LogoutProps){
    const [title, setTitle] = useState([] as any[])
    useEffect(()=>{
        getAllTask.get(`/api/services/app/Task/GetAll`)
        .then(response => {
            setTitle(response.data.result);
        })
    },[])
    // -------OPEN DIALOG-------
    const [open, setOpen] = React.useState(false);
    
    const handleModal = (data: dataTaskForm) => {
        setConfirm(true)
    }
    const handleClickClose = () => {
        setConfirm(false)
        setArchived(false);
        setUnArchived(false);
    }
    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
        setOpen(false);
        }
    };
    
    const commonTasks = title.filter(cmTasks => cmTasks.type === 0)
    const otherTasks = title.filter(otTasks => otTasks.type === 1)
    // ---------------ALERT CONFIG----------------
    const [archive, setArchive] = useState(false)
    const [deArchive, setDeArchive] = useState(false)
    const [delAlert, setDelAlert] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setArchive(false);
        setDeArchive(false);
        setDelAlert(false);
        setError(false);
        setSuccess(false)
    };
    // -----------EDIT TASK CONFIG-------------
    const [taskEdit, setTaskEdit] = useState<dataTaskForm | null>(null);
    const [dataEdit, setDataEdit] = useState<dataTaskForm>({
        id: taskEdit?.id!,
        name: taskEdit?.name!,
        type: taskEdit?.type!,
        isDeleted: taskEdit?.isDeleted!,
    });
    
    // ---------HANDLE--------
    const handleSubmitEdit = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        await getAllTask.post(`/api/services/app/Task/Save`, dataEdit)
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
    const handleClickEdit = (data: dataTaskForm) => {
        setTaskEdit(data);
        setDataEdit(data);
        setOpen(true);
    };

    // -------------CONFIRM CONFIG---------------
    const [confirm, setConfirm] = React.useState(false);
    const [archived, setArchived] = React.useState(false)
    const [unArchived, setUnArchived] = React.useState(false)
    const dispatch = useDispatch()
    const deleteTask = (data: dataTaskForm) => {
        dispatch(dataTaskConfirm(data))
        setConfirm(true)
    }
    const archiveTask = (data: dataTaskForm) => {
        dispatch(dataTaskConfirm(data))
        setArchived(true)
    }
    const deArchiveTask = (data: dataTaskForm) => {
        dispatch(dataTaskConfirm(data))
        setUnArchived(true)
    }
    const getTask = useSelector(confirmSelector)
    const taskName = getTask.taskConfirm.name
    const taskId = getTask.taskConfirm.id
    const id = taskId
    const confirmDelete = async () => {
        await getAllTask.delete(`/api/services/app/Task/Delete?Id=${taskId}`)
        .then(response => {
            setDelAlert(true)
        })
        .catch(error => {
            setError(true)
        })
        getAllTask.get(`/api/services/app/Task/GetAll`)
        .then(response => {
            setTitle(response.data.result);
        })
        setConfirm(false)
    }
    const confirmArchive = async () => {
        await getAllTask.delete(`/api/services/app/Task/Archive?Id=${taskId}`)
        .then(response => {
            if(response.status === 200){
                setDeArchive(true)
            }
        })
        .catch(error => {
            setError(true)
        })
        getAllTask.get(`/api/services/app/Task/GetAll`)
            .then(response => {
                setTitle(response.data.result)
            })
        setArchived(false)
    }
    const confirmDeArchive = async() => {
        await getAllTask.post(`/api/services/app/Task/DeArchive`,{id})
        .then(response => {
            setDeArchive(true)
        })
        .catch(error => {
            setError(true)
        })
        getAllTask.get(`/api/services/app/Task/GetAll`)
            .then(response => {
                setTitle(response.data.result)
            })
        setUnArchived(false)
    }
    return (
        <Box className="TaskManager navbar" sx={{ flexGrow: 1 }}>
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Grid container className='main-body main-task' columns={{ xs: 4, md: 16}} >
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', paddingBottom: '20px'}}>
                    <h1>Task Manager </h1>
                    <NewTask title={title} setTitle={setTitle}/>
                </div>
                <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, md: 16}}>
                <Grid item xs={4} md={8}>
                <h1 style={{margin: '0', padding: '20px 0px', background: 'white', borderRadius: '20px 20px 0px 0px' }}>Common Tasks</h1>
                <Item className='commonTasks' style={{borderRadius: '0px 0px 20px 20px'}}>
                    
                    <div className='data-task'>
                    <ul style={{listStyleType: 'none', padding:'20px'}}>
                    
                    {commonTasks.map((data:any, index:number) => (
                        <li key={index}>
                            <div className='overflowTitle' style={{width:'50%', marginRight:'auto', display:'flex', alignItems: 'center', textAlign:'left'}}>
                                <Button 
                                    variant='contained' 
                                    onClick={() => handleClickEdit(data)} 
                                    sx={{marginRight: '10px'}}
                                    >Edit</Button> 
                                {data.name}
                            </div>
                            <div style={{width:'50%', marginLeft:'auto', display: 'inline-block'}}>
                                <div style={{float:'right'}}>
                                    {data.isDeleted ? (
                                        <Button variant='contained' color='warning' onClick={() => deArchiveTask(data)}>UnArchive</Button>
                                        ) : (
                                        <Button variant='contained' color='warning' onClick={() => archiveTask(data)}>Archive</Button>
                                    )}
                                    <Button 
                                        variant='contained'
                                        sx={{marginLeft: '10px'}}
                                        color="error"
                                        onClick={() => deleteTask(data)}
                                        disabled={!data.isDeleted} 
                                    > Delete </Button>
                                </div>
                            </div>

                        </li>
                    ))} 
                    </ul>
                    </div>
                </Item>
                </Grid>
                <Grid item xs={4} md={8}>
                <h1 style={{margin: '0', padding: '20px 0px', background: 'white', borderRadius: '20px 20px 0px 0px' }}>Other Tasks</h1>
                <Item className='otherTasks' style={{borderRadius: '0px 0px 20px 20px'}}>
                    <ul style={{listStyleType: 'none', padding:'20px'}}>
                        {otherTasks.map((data:any, index:number) => (
                        <li key={index}>
                            <div className='overflowTitle' style={{width:'50%', marginRight:'auto', display:'flex', alignItems: 'center', textAlign:'left'}}>
                                <Button 
                                    variant='contained' 
                                    onClick={() => handleClickEdit(data)} 
                                    sx={{marginRight: '10px'}}
                                    >Edit</Button> 
                                {data.name}
                            </div>
                            <div style={{width:'50%', marginLeft:'auto', display: 'inline-block'}}>
                                <div style={{float:'right'}}>
                                    {data.isDeleted ? (
                                        <Button variant='contained' color='warning' onClick={() => deArchiveTask(data)}>UnArchive</Button>
                                        ) : (
                                        <Button variant='contained' color='warning' onClick={() => archiveTask(data)}>Archive</Button>
                                    )}
                                    
                                    <Button 
                                        variant='contained'
                                        sx={{marginLeft: '10px'}}
                                        color="error"
                                        onClick={() => deleteTask(data)}
                                        disabled={!data.isDeleted} 
                                    > Delete </Button>
                                </div>
                            </div>
                        </li>
                    ))} 
                    </ul>
                </Item>
                </Grid>
                </Grid>
            </Grid>
            {/* --------------TASK EDIT DIALOG------------- */}
            <div>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            autoFocus
                            variant='outlined'
                            label='Input task name'
                            name="name"
                            value={dataEdit.name}
                            onChange={(e) =>
                            setDataEdit({
                                ...dataEdit,
                                [e.target.name]: e.target.value,
                            })
                            }
                        />
                        <span style={{textAlign: 'left', margin: '15px 0px 10px 0px'}}>Select task type</span>
                        <Select
                            autoWidth
                            value={dataEdit.type}
                            onChange={(e) => {
                                setDataEdit({...dataEdit,type: +e.target.value})
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
                <Button onClick={handleSubmitEdit}>Save Task</Button>
            </DialogActions>
            </Dialog>
            </div>

            {/* --------------------CONFIRM DIALOG---------------------- */}
            <div>
                <Dialog open={confirm} onClose={handleClickClose}>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogContent>
                    <em>Delete task: </em> 
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}>{taskName}</span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={confirmDelete}>Delete</Button>
                </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog open={archived} onClose={handleClickClose}>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogContent>
                    <em>Archive task: </em> 
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}>{taskName}</span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={confirmArchive}>Archive</Button>
                </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={unArchived} onClose={handleClickClose}>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogContent>
                    <em>UnArchive task: </em> 
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}>{taskName}</span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={confirmDeArchive}>UnArchive</Button>
                </DialogActions>
                </Dialog>
            </div>
            {/* ---------------ALERT NOTIFICATION---------- */}
            <div>
                {archive ? <Snackbar open={archive} autoHideDuration={2000} onClose={handleCloseAlert} >
                            <Alert severity="success" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                                Archived Task Success!
                            </Alert>
                        </Snackbar> 
                        : <></>}
                {deArchive ? <Snackbar open={deArchive} autoHideDuration={2000} onClose={handleCloseAlert} >
                    <Alert severity="success" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                        UnArchived Task Success!
                    </Alert>
                </Snackbar> 
                : <></>}
                {delAlert ? <Snackbar open={delAlert} autoHideDuration={2000} onClose={handleCloseAlert} >
                            <Alert severity="success" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                                Deleted Task!
                            </Alert>
                        </Snackbar> 
                        : <></>}
                {error ? <Snackbar open={error} autoHideDuration={2000} onClose={handleCloseAlert} >
                    <Alert severity="error" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                        This task is in project, you can't delete'!
                    </Alert>
                </Snackbar> 
                : <></>}
                {success ? <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseAlert} >
                            <Alert severity="success" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                                Updated Task Success!
                            </Alert>
                        </Snackbar> 
                        : <></>}
            </div>
        </Box>
    )
}
export default TaskManager;
