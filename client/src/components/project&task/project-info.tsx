
export interface ProjectProp {
    project: string, 
    date: string, 
    description: string,
    id: string, 
    tasks: TaskProp[]  
}

export interface TaskProp {
    task: string, 
    date: string, 
    id: string, 
    parent: string, 
    completed?: boolean,
    project?:string
}

export const ProjectInfo = function ({project}: {project:ProjectProp}) {
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
            //@ts-ignore 
            // need to fix map with any below
            {  
             project.tasks.map<any>((task) => {
            <div className="project-info-task"></div>
                })
            }
        </div>
    )

}

