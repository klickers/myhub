import { Metadata } from "@redwoodjs/web"

import QuestsCell from "src/components/Quests/QuestsCell"

const IndexPage = () => {
    return (
        <>
            <Metadata title="Quests" description="Quests page" />

            <h1>Quests</h1>
            <QuestsCell />
        </>
    )
}

export default IndexPage
