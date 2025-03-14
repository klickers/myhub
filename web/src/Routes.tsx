// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

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
                    <Set wrap={WorkspaceLayout} title="Workspace">
                        <Route path="/dashboard/workspace" page={DashboardWorkspaceIndexPage} name="workspace" />
                        <Route path="/dashboard/workspace/folder/{slug}" page={DashboardWorkspaceFolderPage} name="workspaceFolder" />
                    </Set>
                </Set>
            </PrivateSet>
            <Route path="/" page={LandingPage} name="landing" />
            <Route notfound page={NotFoundPage} />
        </Router>
    )
}

export default Routes
