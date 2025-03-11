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

const Routes = () => {
    return (
        <Router useAuth={useAuth}>
            <PrivateSet unauthenticated="landing">
                <Set wrap={DashboardLayout}>
                    <Route path="/dashboard" page={DashboardIndexPage} name="dashboard" />
                </Set>
            </PrivateSet>
            <Route path="/" page={LandingPage} name="landing" />
            <Route notfound page={NotFoundPage} />
        </Router>
    )
}

export default Routes
