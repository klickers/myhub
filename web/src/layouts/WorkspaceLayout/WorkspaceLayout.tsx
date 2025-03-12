import FoldersCell from "src/components/Workspace/FoldersCell"

type WorkspaceLayoutProps = {
    children?: React.ReactNode
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
    return (
        <>
            <h1>Workspace</h1>
            <div className="flex gap-10">
                <div className="w-1/5">
                    <FoldersCell />
                </div>
                <div className="w-4/5">{children}</div>
            </div>
        </>
    )
}

export default WorkspaceLayout
