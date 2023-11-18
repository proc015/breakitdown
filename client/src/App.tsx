import './App.css';
import {CreateProject} from './components/create-project/create-project';
import {ProjectDashboard} from './components/dashboard/project-dashboard'
import { useState } from 'react';
import {Navigation} from './components/navigation/navigation'
import { Navbar } from './components/navigation/navbar';
// TO DO:
// @ts-ignore
import { getProjectsFromServer } from './api-service';
// import {v4 as uuidv4} from 'uuid'
import { useEffect } from 'react';
import { TaskDashboard } from './components/dashboard/task-dashboard';
import { ProjectProp } from './components/project&task/project-info';

// TO DO:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockObj = [
  {
    "project": "Clean My House",
    "description": "I need to clean my house; it's a mess, especially the fridge.",
    "date": "2023-12-06 12:00",
    "tasks": [
      {"task": "Wipe the Floors", "date": "2023-12-06 11:00"},
      {"task": "Clean the Fridge", "date": "2023-12-06 11:30"}
    ]
  },
  {
    "project": "Plan Vacation",
    "description": "Plan a vacation for the upcoming holidays.",
    "date": "2023-12-15 09:00",
    "tasks": [
      {"task": "Research Destinations", "date": "2023-12-10 15:00"},
      {"task": "Book Accommodation", "date": "2023-12-12 14:00"}
    ]
  },
  {
    "project": "Fitness Challenge",
    "description": "Start a 30-day fitness challenge.",
    "date": "2023-11-20 08:00",
    "tasks": [
      {"task": "Create Workout Plan", "date": "2023-11-15 18:00"},
      {"task": "Buy Workout Gear", "date": "2023-11-17 12:30"}
    ]
  },
  {
    "project": "Learn Coding",
    "description": "Begin learning a new programming language.",
    "date": "2023-11-25 10:30",
    "tasks": [
      {"task": "Choose Programming Language", "date": "2023-11-20 14:00"},
      {"task": "Enroll in Online Course", "date": "2023-11-22 09:00"}
    ]
  },
  {
    "project": "Gardening Project",
    "description": "Start a small vegetable garden.",
    "date": "2023-12-01 13:00",
    "tasks": [
      {"task": "Buy Seeds and Soil", "date": "2023-11-25 16:30"},
      {"task": "Plant Seeds", "date": "2023-11-28 11:00"}
    ]
  },
  {
    "project": "Book Reading Challenge",
    "description": "Read 10 books by the end of the year.",
    "date": "2023-12-31 18:00",
    "tasks": []
  }
]
function App() {
  const [projects, setProjects] = useState<ProjectProp[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(true)
  const [openNavbar, setOpenNavbar] = useState(false)
  const [openProjectDashboard, setOpenProjectDashboard] = useState(true)
  const [openTaskDashboard, setOpenTaskDashboard] = useState(true)

  const handleNavbarClick = function () {
    setOpenNavbar(!openNavbar)
  }

  const toggleCreateModal = function () {
    setOpenCreateModal(!openCreateModal)
  }
  


  
  useEffect(() => {
    const fetchOldProjects = async function () {
      try {
        const response = await getProjectsFromServer()
        setProjects([...response])
      } catch (error) {
        console.log("Error when rendering projects: ", error)
      }
    }

    fetchOldProjects()
    }, [])


  return (
    <div className="App p-0 m-0 min-h-[100vh] ">
        {/* TO DO: className='h-100' not a valid tailwind class and also cannot apply className to component directly */}
        <Navigation
        handleNavbarClick={handleNavbarClick} 
        toggleCreateModal={toggleCreateModal}
        />
      {openNavbar ?
        <Navbar 
        setOpenNavbar={setOpenNavbar}
        setOpenProjectDashboard={setOpenProjectDashboard}
        setOpenTaskDashboard={setOpenTaskDashboard}
        />
        :
        <div></div>
      }
      {
        openProjectDashboard ?
        <ProjectDashboard projects={projects} setProjects={setProjects}/>
        :
        null
      }
     {
        openTaskDashboard ?
        <TaskDashboard setProjects={setProjects} projects={projects}></TaskDashboard>
        :
        null
      }
      {
        openCreateModal ? 
          // TO DO: check if deleting className='CreateProject' from this component did anything
          <CreateProject projects={projects} setProjects={setProjects} toggleCreateModal={toggleCreateModal}></CreateProject>
          :
          null
      } 
    </div>
  );
}




export default App;
