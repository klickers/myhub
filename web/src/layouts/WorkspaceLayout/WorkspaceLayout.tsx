import FoldersCell from "src/components/Workspace/FoldersCell"

type WorkspaceLayoutProps = {
    children?: React.ReactNode
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
    return (
        <>
            <h1>Workspace</h1>
            <div className="flex gap-10 flex-col sm:flex-row">
                <div className="sm:w-1/5 w-full">
                    <FoldersCell />
                </div>
                <div className="sm:w-4/5 w-full">{children}</div>
            </div>
        </>
    )
}

export default WorkspaceLayout
