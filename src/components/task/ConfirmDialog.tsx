import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NewTask from '../../components/task/NewTask';
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
import {getAllTask} from '../../tscript/Task';
import {dataTaskForm} from '../../tscript/Task';
import {useSelector, useDispatch} from 'react-redux';
import { dataTaskConfirm, confirmSelector } from '../../features/ConfirmTask';

export default function(){
    const dispatch = useDispatch()
    return (
        <div></div>
    )
}