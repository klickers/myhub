import { Metadata } from "@redwoodjs/web"

import UpdateQuestCell from "src/components/Quests/UpdateQuestCell"

const UpdateQuestPage = ({ id }) => {
    return (
        <>
            <Metadata title="Update Quest" description="Update quest" />
            <UpdateQuestCell id={id} />
        </>
    )
}

export default UpdateQuestPage
