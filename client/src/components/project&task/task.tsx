import Checkbox from '@mui/material/Checkbox';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

//@ts-ignore
import {toggleCompleted} from '../../api-service'

import { ProjectProp } from './project-info';
import { TaskProp } from './project-info';

export const Task = function ({projects, task, setTasks, setProjects}: {projects: ProjectProp[], task:TaskProp, setTasks: Function, setProjects: Function }) {

    const parseTime = function (task?:TaskProp) {
        const date = new Date(task!.date)
        const mins = String(date.getMinutes()).padStart(2, '0')
        const hours = date.getHours()
        return `${hours}:${mins}`
    }

    const getParentProject = function (taskId?:string) {
        console.log(task)
        const project = projects.find((project) => project.id === task.parent);
        console.log(project)
        return project;
    }
 
     

    const handleCheckChange = function (taskId:string) {
        const parentProject = getParentProject(taskId)
        const updatedTasks = parentProject!.tasks.map((task) => {
            if (task.id === taskId) {
                task.completed = !task.completed
            }
            return task;
        })
        const updatedProjects = projects.map((project) => {
            if (project.id === parentProject!.id) {
                return {
                    ...project, 
                    tasks: updatedTasks
                };
            } else {
                return project;
            }
            })
        setProjects([...updatedProjects]);
            //@ts-ignore
        saveCompletedStatus(task)
    }

    const saveCompletedStatus = async function () {
        try {
            console.log(task.id)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const result = await toggleCompleted(task);
        } catch (error) {
            console.log(error)
        }
    }

    //@ts-ignore
    const parsedTime = parseTime(task.date)

    return (
        <div className="Task border rounded-lg px-1">
            <div className="top  flex items-center justify-between">
                <div className="left flex items-center">
                    {
                        task.completed === true ? 
                        <Checkbox defaultChecked onChange={() => handleCheckChange(task.id)} checkedIcon={<CheckCircleIcon/>} color="success"/>
                        :
                        <Checkbox onChange={() => handleCheckChange(task.id)} checkedIcon={<CheckCircleIcon/>} color="success"/>
                    }
                    <h3 className="text-gray-800 font-semibold ml-2">{task.project}</h3>

                </div>
                <p className="mr-5 font-semibold text-gray-500 ">{parsedTime}</p>
            </div>
            <div className="bottom ml-14 mb-1">
                <p className="text-sm text-gray-500">{getParentProject(task.parent)?.project}</p>
            </div>
        </div>
    )
}