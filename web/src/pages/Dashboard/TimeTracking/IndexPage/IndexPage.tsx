import { endOfToday, startOfToday } from "date-fns"

import { Metadata } from "@redwoodjs/web"

import CreateSession from "src/components/TimeTracking/CreateSession/CreateSession"
import PlayTimeEntry from "src/components/TimeTracking/PlayTimeEntry/PlayTimeEntry"
import UpcomingSessionsCell from "src/components/TimeTracking/UpcomingSessionsCell/UpcomingSessionsCell"

const IndexPage = () => {
    return (
        <>
            <Metadata title="Time Tracking" description="Time tracking" />
            <h1>Time Tracking</h1>
            <div className="flex gap-12 w-full">
                <div className="w-1/3">
                    <PlayTimeEntry />
                    <br />
                    <CreateSession />
                </div>
                <div className="w-1/3">
                    <div>
                        <h2>Upcoming</h2>
                        <UpcomingSessionsCell
                            start={startOfToday()}
                            end={endOfToday()}
                        />
                    </div>
                    <br />
                    <p>Entries coming up - can expand to pull more</p>
                </div>
                <div>
                    <h2>Daily Timeline</h2>
                    <p>Previous timeline (with notes)</p>
                    <p>Previously tracked entries (to track again?)</p>
                </div>
                <div>
                    <p></p>
                </div>
            </div>
        </>
    )
}

export default IndexPage
