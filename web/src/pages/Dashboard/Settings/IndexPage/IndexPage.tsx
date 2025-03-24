import { Metadata } from "@redwoodjs/web"

import GoogleCalendarLinksCell from "src/components/Settings/GoogleCalendarLinksCell"
import SettingsCell from "src/components/Settings/SettingsCell"

const IndexPage = () => {
    return (
        <>
            <Metadata title="Settings" description="Settings page" />
            <h1>Settings</h1>

            <GoogleCalendarLinksCell />

            <h2 className="mt-16">Other Settings</h2>
            <SettingsCell />
        </>
    )
}

export default IndexPage
