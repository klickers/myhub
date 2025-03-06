import { Icon } from "@iconify/react"

import { NavLink, routes } from "@redwoodjs/router"

type DashboardLayoutProps = {
    children?: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div>
            <aside
                id="sidenav"
                className="w-16 h-screen fixed p-2 border-r border-neutral-200"
            >
                <div>
                    <NavLink
                        to={routes.dashboard()}
                        activeClassName="active-link"
                    >
                        <Icon icon="mingcute:home-3-line" />
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        <Icon icon="mingcute:calendar-2-line" />
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        <Icon icon="mingcute:book-2-line" />
                    </NavLink>
                </div>
                <div className="mt-10">
                    <NavLink to="#!" activeClassName="active-link">
                        <Icon icon="mingcute:school-line" />
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        <Icon icon="mingcute:magic-3-line" />
                    </NavLink>
                </div>
                <NavLink
                    to="#!"
                    className="absolute bottom-2"
                    activeClassName="active-link"
                >
                    <Icon icon="mingcute:settings-5-line" />
                </NavLink>
            </aside>
            <main className="ml-16 py-6 px-8">{children}</main>
        </div>
    )
}

export default DashboardLayout
