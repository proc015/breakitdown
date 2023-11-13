import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {toggleCompleted} from '../../api-service'


export const Task = function ({projects, task, setProjects}) {

    const parseTime = function () {
        const date = new Date(task.date)
        const mins = String(date.getMinutes()).padStart(2, '0')
        const hours = date.getHours()
        return `${hours}:${mins}`
    }

    const getParentProject = function () {
        console.log(task)
        const project = projects.find((project) => project.id === task.parent);
        console.log(project)
        return project;
    }

    const handleCheckChange = function (taskId) {
        const parentProject = getParentProject(taskId)
        const updatedTasks = parentProject.tasks.map((task) => {
            if (task.id === taskId) {
                task.completed = !task.completed
            }
            return task;
        })
        const updatedProjects = projects.map((project) => {
            if (project.id === parentProject.id) {
                return {
                    ...project, 
                    tasks: updatedTasks
                };
            } else {
                return project;
            }
            })
        setProjects([...updatedProjects]);

        saveCompletedStatus(task)
    }

    const saveCompletedStatus = function () {
        try {
            console.log(task.id)
            toggleCompleted(task);
        } catch (error) {
            console.log(error)
        }
    }

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
                <p className="mr-5 font-semibold text-gray-500 ">{parseTime(task.date)}</p>
            </div>
            <div className="bottom ml-14 mb-1">
                <p className="text-sm text-gray-500">{getParentProject(task.parent).project}</p>
            </div>
        </div>
    )
}