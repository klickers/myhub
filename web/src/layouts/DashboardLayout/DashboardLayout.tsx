import { NavLink, routes } from "@redwoodjs/router"

type DashboardLayoutProps = {
    children?: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div>
            <aside
                id="sidenav"
                className="h-screen fixed py-2 border-r border-black"
            >
                <NavLink to={routes.dashboard()} activeClassName="active-link">
                    Home
                </NavLink>
                <div className="mt-10">
                    <NavLink to="#!" activeClassName="active-link">
                        Calendar
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        Tasks
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        Journal
                    </NavLink>
                </div>
                <NavLink
                    to="#!"
                    className="absolute bottom-2"
                    activeClassName="active-link"
                >
                    Settings
                </NavLink>
            </aside>
            <main className="ml-28 py-8 px-8">{children}</main>
        </div>
    )
}

export default DashboardLayout
