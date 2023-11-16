
interface ProjectInfoProps {
    project: string, 
    description: string,
    tasks: Task[]  
}

interface Task {
    task: string, 
    date: string, 
}

export const ProjectInfo = function ({project}: {project:ProjectInfoProps}) {
    console.log("projetModal")
    console.log(project)
    return (
        <div className="ProjectInfo">
            <h1>{project.project} </h1>
            {
                project.description ? 
                <div className="project-info-description">
                    <p>Description</p>
                    <p>{project.description}</p>
                </div>
                :
                <div></div>
            }
            {
                project.tasks.map<Task[]>((task:Task) => {
                    <div className="project-info-task"></div>
                })
            }
        </div>
    )

}

