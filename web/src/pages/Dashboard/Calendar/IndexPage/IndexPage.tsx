// import { Link, routes } from '@redwoodjs/router'
import { Icon } from "@iconify/react/dist/iconify.js"

import { Metadata } from "@redwoodjs/web"

const IndexPage = () => {
    return (
        <>
            <Metadata title="Calendar" description="Dashboard calendar" />
            <div className="flex items-center justify-between mb-10">
                <h1 className="mb-0">Calendar</h1>
                <button>
                    <Icon icon="gravity-ui:arrows-rotate-left" /> Recalculate
                </button>
            </div>
        </>
    )
}

export default IndexPage
