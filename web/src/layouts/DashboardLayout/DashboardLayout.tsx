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
                    HQ
                </NavLink>
                <div className="mt-10">
                    <NavLink to="#!" activeClassName="active-link">
                        Schedule
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        Operations
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        Logbook
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
            <main className="ml-32 py-8 px-8">{children}</main>
        </div>
    )
}

export default DashboardLayout
