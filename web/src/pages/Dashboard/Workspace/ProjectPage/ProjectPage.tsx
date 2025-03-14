import ProjectHeaderCell from "src/components/Workspace/ProjectHeaderCell"
import ProjectsCell from "src/components/Workspace/ProjectsCell"

const ProjectPage = ({ slug }) => {
    return (
        <>
            <ProjectHeaderCell slug={slug} />
            <ProjectsCell parentSlug={slug} />
        </>
    )
}

export default ProjectPage
