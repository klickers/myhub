import { Metadata } from "@redwoodjs/web"

import TasksCell from "src/components/Workspace/TasksCell"

const IndexPage = () => {
    return (
        <>
            <Metadata
                title="Dashboard Workspace"
                description="Dashboard Workspace"
            />

            <TasksCell parentSlug="" />
        </>
    )
}

export default IndexPage
