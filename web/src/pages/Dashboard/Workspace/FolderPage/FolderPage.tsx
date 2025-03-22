import FolderCell from "src/components/Workspace/FolderCell"
import ProjectsCell from "src/components/Workspace/ProjectsCell"
import TasksCell from "src/components/Workspace/TasksCell"

const FolderPage = ({ slug }) => {
    return (
        <>
            <FolderCell slug={slug} />
            <ProjectsCell parentSlug={slug} />
            <div className="mt-10"></div>
            <TasksCell parentSlug={slug} />
        </>
    )
}

export default FolderPage
