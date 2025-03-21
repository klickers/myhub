import { useEffect, useState } from "react"

import { Draggable } from "@fullcalendar/interaction"
import type {
    TimeBlockTypesQuery,
    TimeBlockTypesQueryVariables,
} from "types/graphql"

import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import CreateTimeBlockType from "../CreateTimeBlockType/CreateTimeBlockType"

export const QUERY: TypedDocumentNode<
    TimeBlockTypesQuery,
    TimeBlockTypesQueryVariables
> = gql`
    query TimeBlockTypesQuery {
        timeBlockTypes {
            id
            name
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
    <div>
        <CreateTimeBlockType query={{ query: QUERY }} />
    </div>
)

export const Failure = ({
    error,
}: CellFailureProps<TimeBlockTypesQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    timeBlockTypes,
}: CellSuccessProps<TimeBlockTypesQuery, TimeBlockTypesQueryVariables>) => {
    const [draggable, setDraggable] = useState(null)

    useEffect(() => {
        const draggableEl = document.getElementById("time-block-types")
        setDraggable(
            new Draggable(draggableEl, {
                itemSelector: ".time-block-type",
                eventData: function (eventEl) {
                    const id = eventEl.getAttribute("key")
                    const title = eventEl.getAttribute("title")
                    const typeId = eventEl.dataset.typeId

                    return {
                        id,
                        title,
                        typeId,
                        create: true,
                        classNames: ["event--time-block"],
                    }
                },
            })
        )

        // hide sidebar on drag
    }, [])

    return (
        <div>
            {timeBlockTypes ? (
                <div id="time-block-types" className="mb-6">
                    {timeBlockTypes.map((item) => (
                        <div
                            key={item.id}
                            title={item.name}
                            data-type-id={item.id}
                            className="time-block-type rounded-3xl py-3 px-6 border border-gray-100 bg-gray-100 cursor-pointer duration-300 hover:bg-white hover:border-gray-300"
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            ) : null}
            <CreateTimeBlockType query={{ query: QUERY }} />
        </div>
    )
}
