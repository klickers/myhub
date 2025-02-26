import {Icon} from "@iconify/react"

import {NavLink, routes} from "@redwoodjs/router"

type DashboardLayoutProps = {
    children?: React.ReactNode
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <div>
            <aside
                id="sidenav"
                className="w-16 h-screen fixed p-2 border-r border-neutral-200"
            >
                <NavLink to={routes.dashboard()} activeClassName="active-link">
                    <Icon icon="gravity-ui:house" />
                </NavLink>
                <div className="mt-10">
                    <NavLink to="#!" activeClassName="active-link">
                        <Icon icon="gravity-ui:calendar" />
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        <Icon icon="gravity-ui:square-list-ul" />
                    </NavLink>
                    <NavLink to="#!" activeClassName="active-link">
                        <Icon icon="gravity-ui:book" />
                    </NavLink>
                </div>
                <NavLink
                    to="#!"
                    className="absolute bottom-2"
                    activeClassName="active-link"
                >
                    <Icon icon="gravity-ui:gear" />
                </NavLink>
            </aside>
            <main className="ml-16 py-6 px-8">{children}</main>
        </div>
    )
}

export default DashboardLayout
