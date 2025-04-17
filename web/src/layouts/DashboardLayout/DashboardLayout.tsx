import { routes } from "@redwoodjs/router"
import { Toaster } from "@redwoodjs/web/toast"

import SidebarButton from "src/components/SidebarButton/SidebarButton"

type DashboardLayoutProps = {
    children?: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div>
            <Toaster />
            <aside
                id="sidenav"
                className="w-16 h-screen fixed p-2 border-r border-gray-200"
            >
                <SidebarButton
                    to={routes.calendar()}
                    icon="game-icons:castle"
                    label="Home"
                />
                <SidebarButton
                    to={routes.timeTracking()}
                    icon="game-icons:notebook"
                    label="logbook"
                />
                <div className="mt-10">
                    <SidebarButton
                        to={routes.workspace()}
                        icon="gravity-ui:square-list-ul"
                        label="Workspace"
                    />
                    <SidebarButton
                        to="#!"
                        icon="game-icons:book-cover"
                        label="Skill Codex"
                    />
                    <SidebarButton
                        to="#!"
                        icon="game-icons:treasure-map"
                        label="Campaigns"
                    />
                    <SidebarButton
                        to="#!"
                        icon="game-icons:flamed-leaf"
                        label="Quests"
                    />
                </div>
                <div className="absolute bottom-2">
                    <SidebarButton
                        to={routes.settings()}
                        icon="game-icons:big-gear"
                        label="Settings"
                    />
                </div>
            </aside>
            <main className="ml-16 py-6 px-8">{children}</main>
        </div>
    )
}

export default DashboardLayout
