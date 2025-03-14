import FolderCell from "src/components/Workspace/FolderCell"
import ProjectsCell from "src/components/Workspace/ProjectsCell"

const FolderPage = ({ slug }) => {
    return (
        <>
            <FolderCell slug={slug} />
            <ProjectsCell parentSlug={slug} />
        </>
    )
}

export default FolderPage
