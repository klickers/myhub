import { Router, Route, Set, PrivateSet } from "@redwoodjs/router"

import { useAuth } from "./auth"
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout"
import WorkspaceLayout from "./layouts/WorkspaceLayout/WorkspaceLayout"

const Routes = () => {
    return (
        <Router useAuth={useAuth}>
            <PrivateSet unauthenticated="landing">
                <Set wrap={DashboardLayout} title="Dashboard">
                    <Route path="/dashboard" page={DashboardIndexPage} name="dashboard" />
                    <Route path="/dashboard/logbook" page={DashboardTimeTrackingIndexPage} name="logbook" />
                    <Route path="/dashboard/calendar" page={DashboardCalendarIndexPage} name="calendar" />
                    <Set wrap={WorkspaceLayout} title="Workspace">
                        <Route path="/dashboard/workspace" page={DashboardWorkspaceIndexPage} name="workspace" />
                        <Route path="/dashboard/workspace/folder/{slug}" page={DashboardWorkspaceFolderPage} name="workspaceFolder" />
                        <Route path="/dashboard/workspace/project/{slug}" page={DashboardWorkspaceProjectPage} name="workspaceProject" />
                        <Route path="/dashboard/workspace/project/{slug}/update" page={DashboardWorkspaceUpdateProjectPage} name="workspaceUpdateProject" />
                    </Set>
                    <Route path="/dashboard/codex" page={DashboardCodexIndexPage} name="codex" />
                    <Route path="/dashboard/codex/{slug}" page={DashboardCodexSkillPage} name="skill" />
                    <Route path="/dashboard/settings" page={DashboardSettingsIndexPage} name="settings" />
                </Set>
            </PrivateSet>
            <Route path="/" page={LandingPage} name="landing" />
            <Route notfound page={NotFoundPage} />
        </Router>
    )
}

export default Routes
