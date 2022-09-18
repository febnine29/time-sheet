import * as React from 'react';
import {authRequest} from '../../../api/baseUrl';
import {UseFormSetValue} from 'react-hook-form'
import {UserNotPagging} from '../../../tscript/Project';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from 'react-redux';
import {taskAdded} from '../../../features/ProjectReducer'
import {
    deleteArrInArrByIdTask,
    deleteArrRemoveTaskForm,
    mergeObjectByIdTask,
    mergeObjectTaskForm,
    TaskFormNewProject,
    Task,
    PayLoadNewProject
} from '../../../tscript/Project';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export interface TasksProps {
    tasks: Task[] | null;
    setValue: UseFormSetValue<Partial<PayLoadNewProject>>;
    taskDefaultValue?: TaskFormNewProject[];
}

export default function Tasks(){
    const dispatch = useDispatch()
    // -----------PERSONAL CONFIG------------
    const [tasksCheck, setTasksCheck] = React.useState<Task[] | null>(null);
    const [taskForm, setTaskForm] = React.useState<TaskFormNewProject[] | null>(null);
    const [tasksCpn, setTasksCpn] = React.useState<Task[] | null>(null);
    const [flagTaskCheck, setFlagTaskCheck] = React.useState({});

    const [tasks, setTasks] = React.useState([] as any[]);
    const getAllTask = async () => {
        await authRequest.get(`/api/services/app/Task/GetAll`)
        .then((response) => {
            setTasksCpn(response.data.result);
            setTasks(response.data.result)
        })
    }
    React.useEffect(() => {
        getAllTask();
        // console.log('tasks', tasks)
    },[])
    const handleClickAddTask = (task: Task) => {
        // Add taskCheck
        if (tasksCheck) {
        setTasksCheck([...tasksCheck, task]);
        setFlagTaskCheck({});
        } else {
        setTasksCheck([task]);
        setFlagTaskCheck({});
        }
        // add taskForm
        if (!taskForm) {
            setTaskForm([{ taskId: task.id, billable: false }]);
        } else {
            setTaskForm([...taskForm!, { taskId: task.id, billable: false }]);
            
        }
        dispatch(taskAdded({ taskId: task.id, billable: false }))
        // -------remove task in task list---------
        const taskId = tasks.indexOf(task)            
        if(taskId > -1) {
            tasks.splice(taskId, 1);
        }
    };

    const handleClickRemoveTask = (task: Task) => {
        setTasksCheck(deleteArrInArrByIdTask(tasksCheck as Task[], [task])!);

            if (tasksCpn) {
                setTasksCpn([...tasksCpn, task]);
            }
                setTaskForm(
                deleteArrRemoveTaskForm(taskForm as TaskFormNewProject[])(task.id)
            );
    };
    const handleChangeCheckBox = (
        e: React.ChangeEvent<HTMLInputElement>,
        taskId: number
    ) => {
        setTaskForm(
        mergeObjectTaskForm(taskForm!)({ taskId, billable: e.target.checked })
        );
        dispatch(taskAdded({ taskId, billable: e.target.checked }))
    };
    React.useEffect(() => {
        dispatch(taskAdded(taskForm))
        console.log('taskForm', taskForm)
    },[taskForm])

    React.useEffect(() => {
        setTasksCpn(tasks);
    }, [tasks]);


    return (
        <div className="Task">
            <div className="selected-tasks">
                <h3 style={{height: '30px', borderBottom: '1px solid lightGrey'}}>Selected Tasks</h3>
            {mergeObjectByIdTask(tasksCheck!)(taskForm!)?.map((task, index) => (
                <div key={index} style={{display: 'flex', alignItems: 'center', maxWidth: '600px'}}>
                    <IconButton onClick={() => handleClickRemoveTask(task)} color="error">
                        <CloseIcon />
                    </IconButton>
                    <h4>{task.name}</h4>
                    <Checkbox sx={{marginLeft: 'auto'}} 
                    onChange={(e) => handleChangeCheckBox(e as any,task.id)} />
                </div>
            ))}
            </div>
            <div className="tasks-list">
                <h3 style={{height: '30px', borderBottom: '1px solid lightGrey'}}>Tasks List</h3>
            {tasks.map((task) =>(
                <div style={{display: 'flex', alignItems: 'center', maxWidth: '600px'}}>
                    <IconButton color="primary" onClick={() => handleClickAddTask(task)}>
                        <AddCircleIcon></AddCircleIcon>
                    </IconButton>
                    <h4>{task.name}</h4>
                    <span style={{marginLeft: 'auto'}}>{task.type === 0 ? 'Common Task' : 'Other Task' }</span>
                </div>
            ))}
            </div>
        </div>
    )
}