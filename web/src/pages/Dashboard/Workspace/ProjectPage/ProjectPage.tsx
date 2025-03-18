import ProjectHeaderCell from "src/components/Workspace/ProjectHeaderCell"
import ProjectsCell from "src/components/Workspace/ProjectsCell"
import TasksCell from "src/components/Workspace/TasksCell"

const ProjectPage = ({ slug }) => {
    return (
        <>
            <ProjectHeaderCell slug={slug} />
            <ProjectsCell parentSlug={slug} />
            <div className="mt-10"></div>
            <TasksCell parentSlug={slug} />
        </>
    )
}

export default ProjectPage
