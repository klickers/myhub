import { Metadata } from "@redwoodjs/web"

import UpdateProjectCell from "src/components/Workspace/UpdateProjectCell"

const UpdateProjectPage = ({ slug }) => {
    return (
        <>
            <Metadata title="Update Project" description="Update project" />
            <UpdateProjectCell slug={slug} />
        </>
    )
}

export default UpdateProjectPage
