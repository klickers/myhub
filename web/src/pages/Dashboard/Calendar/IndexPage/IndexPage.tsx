import { useEffect, useRef, useState } from "react"

import googleCalendarPlugin from "@fullcalendar/google-calendar"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
    addHours,
    addMinutes,
    differenceInMinutes,
    endOfWeek,
    format,
    isBefore,
    isEqual,
    startOfWeek,
} from "date-fns"
import {
    CreateTimeBlockMutation,
    CreateTimeBlockMutationVariables,
    Item,
    UpdateTimeBlockMutation,
    UpdateTimeBlockMutationVariables,
    DeleteTimeBlockMutation,
    DeleteTimeBlockMutationVariables,
    CreateSessionsMutation,
    CreateSessionsMutationVariables,
    DeleteSessionsMutation,
    DeleteSessionsMutationVariables,
    CreateSessionMutation,
    CreateSessionMutationVariables,
    UpdateSessionMutation,
    UpdateSessionMutationVariables,
    DeleteSessionMutation,
    DeleteSessionMutationVariables,
    SessionType,
    GoogleCalendarLink,
} from "types/graphql"

import { Metadata, useMutation, useQuery } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CustomModal from "src/components/CustomModal/CustomModal"
import Breadcrumb from "src/components/Workspace/Breadcrumb/Breadcrumb"

import TimeBlockSidebar from "../../../../components/Calendar/TimeBlockSidebar/TimeBlockSidebar"

const QUERY_SETTINGS = gql`
    query CalendarSettingsQuery {
        settings {
            name
            value
        }
    }
`

const QUERY_GOOGLE_CALENDAR_LINKS = gql`
    query GoogleCalendarLinksQuery {
        googleCalendarLinks {
            calendarLink
            classes
        }
    }
`

const QUERY_TASKS = gql`
    query CalendarTasksQuery($statusCodes: [StatusCode] = [OPEN, IN_PROGRESS]) {
        tasks(statusCodes: $statusCodes) {
            id
            name
            softDueDate
            dueDate
            estimatedTime
            minBlockTime
            maxBlockTime
            maxBlockTimePerDay
            sessions {
                start
                end
            }
        }
    }
`

const QUERY_TIME_BLOCKS = gql`
    query TimeBlocksQuery($start: DateTime!, $end: DateTime!) {
        timeBlocks(start: $start, end: $end) {
            id
            start
            end
            type {
                name
            }
        }
    }
`

const CREATE_TIME_BLOCK = gql`
    mutation CreateTimeBlockMutation($input: CreateTimeBlockInput!) {
        createTimeBlock(input: $input) {
            id
        }
    }
`

const UPDATE_TIME_BLOCK = gql`
    mutation UpdateTimeBlockMutation($id: Int!, $input: UpdateTimeBlockInput!) {
        updateTimeBlock(id: $id, input: $input) {
            id
        }
    }
`

const DELETE_TIME_BLOCK = gql`
    mutation DeleteTimeBlockMutation($id: Int!) {
        deleteTimeBlock(id: $id) {
            id
        }
    }
`

const QUERY_SESSIONS = gql`
    query SessionsQuery($start: DateTime!, $end: DateTime!) {
        sessions(start: $start, end: $end) {
            id
            start
            end
            type
            notes
            item {
                id
                name
                parent {
                    type
                    name
                    slug
                }
            }
        }
    }
`

const CREATE_SESSIONS = gql`
    mutation CreateSessionsMutation($input: [CreateSessionInput!]!) {
        createSessions(input: $input) {
            id
        }
    }
`

const DELETE_SESSIONS = gql`
    mutation DeleteSessionsMutation($ids: [Int!]!) {
        deleteSessions(ids: $ids)
    }
`

const CREATE_SESSION = gql`
    mutation CreateSessionMutation($input: CreateSessionInput!) {
        createSession(input: $input) {
            id
            start
            end
            type
            item {
                id
                name
                parent {
                    type
                    name
                    slug
                }
            }
        }
    }
`

const UPDATE_SESSION = gql`
    mutation UpdateSessionMutation($id: Int!, $input: UpdateSessionInput!) {
        updateSession(id: $id, input: $input) {
            id
        }
    }
`

const DELETE_SESSION = gql`
    mutation DeleteSessionMutation($id: Int!) {
        deleteSession(id: $id) {
            id
        }
    }
`

const IndexPage = () => {
    const fcRef = useRef(null)
    const modalRef = useRef()

    const [calendarApi, setCalendarApi] = useState(null)
    const [currentStart, setCurrentStart] = useState(startOfWeek(new Date()))
    const [currentEnd, setCurrentEnd] = useState(endOfWeek(new Date()))

    const [googleCalendarApiKey, setGoogleCalendarApiKey] = useState()
    const querySettings = useQuery(QUERY_SETTINGS)

    const [eventSources, setEventSources] = useState([])
    const queryGoogleCalendarLinks = useQuery(QUERY_GOOGLE_CALENDAR_LINKS)

    const [timeBlocks, setTimeBlocks] = useState([])
    const queryTimeBlocks = useQuery(QUERY_TIME_BLOCKS, {
        variables: {
            start: currentStart,
            end: currentEnd,
        },
    })

    const [modalEvent, setModalEvent] = useState(null)

    const [sessions, setSessions] = useState([])
    const querySessions = useQuery(QUERY_SESSIONS, {
        variables: {
            start: currentStart,
            end: currentEnd,
        },
    })

    useEffect(() => {
        setCalendarApi(fcRef.current.getApi())
        setCurrentStart(fcRef.current.getApi().view.currentStart)
        setCurrentEnd(fcRef.current.getApi().view.currentEnd)

        if (querySettings.data) {
            const findSetting = querySettings.data.settings.filter(
                (setting) => setting.name == "googleCalendarApiKey"
            )
            if (findSetting) setGoogleCalendarApiKey(findSetting[0].value)
        }

        let timeBlocksData, sessionsData
        if (queryTimeBlocks.data) {
            timeBlocksData = queryTimeBlocks.data.timeBlocks.map((block) => {
                return { ...block, title: block.type.name }
            })
            setTimeBlocks(timeBlocksData)
        }
        if (querySessions.data) {
            sessionsData = querySessions.data.sessions.map((session) => {
                return { ...session, title: session.item.name }
            })
            setSessions(sessionsData)
        }

        const eventSourcesData = [
            {
                id: "0",
                events: timeBlocksData,
                className: ["event--time-block"],
            },
            {
                id: "1",
                events: sessionsData,
                className: ["event--session"],
            },
        ]

        if (queryGoogleCalendarLinks.data) {
            queryGoogleCalendarLinks.data.googleCalendarLinks.forEach(
                (link: GoogleCalendarLink) => {
                    eventSourcesData.push({
                        googleCalendarId: link.calendarLink,
                        className: [link.classes],
                    })
                }
            )
        }

        setEventSources(eventSourcesData)
    }, [
        fcRef,
        queryTimeBlocks,
        querySessions,
        queryGoogleCalendarLinks,
        querySettings,
    ])

    function showTimeBlockSidebar() {
        const calendar = document.getElementById("calendar-wrapper")
        const display =
            document.getElementById("time-block-sidebar").style.display
        if (display == "block") {
            calendar.classList.remove("w-3/4")
            calendar.classList.add("w-full")
            document.getElementById("time-block-sidebar").style.display = "none"
        } else {
            calendar.classList.add("w-3/4")
            calendar.classList.remove("w-full")
            document.getElementById("time-block-sidebar").style.display =
                "block"
        }
        setTimeout(() => {
            calendarApi.updateSize()
        }, 200)
    }

    // *****************************************
    // *
    // * Create time block (eventReceive)
    // *
    // *****************************************
    const [createTimeBlock] = useMutation<
        CreateTimeBlockMutation,
        CreateTimeBlockMutationVariables
    >(CREATE_TIME_BLOCK, {
        onCompleted: () => {
            toast.success("Time block created!")
        },
    })
    async function eventReceive(eventInfo) {
        const res = await createTimeBlock({
            variables: {
                input: {
                    start: eventInfo.event.start,
                    end:
                        eventInfo.event.end ??
                        addHours(eventInfo.event.start, 1),
                    typeId: parseInt(eventInfo.event.extendedProps.typeId),
                },
            },
        })
        eventInfo.event.remove()
        setTimeBlocks([
            ...timeBlocks,
            {
                id: res.data.createTimeBlock.id,
                title: eventInfo.event.title,
                typeId: parseInt(eventInfo.event.extendedProps.typeId),
                start: eventInfo.event.start,
                end: eventInfo.event.end ?? addHours(eventInfo.event.start, 1),
                classNames: ["event--time-block"],
            },
        ])
    }

    // *******************************************
    // *
    // * Update time block (eventDrop, eventResize)
    // *
    // *******************************************
    const [updateTimeBlock] = useMutation<
        UpdateTimeBlockMutation,
        UpdateTimeBlockMutationVariables
    >(UPDATE_TIME_BLOCK, {
        onCompleted: () => {
            toast.success("Time block updated!")
        },
    })
    const [updateSession] = useMutation<
        UpdateSessionMutation,
        UpdateSessionMutationVariables
    >(UPDATE_SESSION, {
        onCompleted: () => {
            toast.success("Session updated!")
        },
    })
    function eventUpdate(eventInfo) {
        const data = {
            variables: {
                id: parseInt(eventInfo.event.id),
                input: {
                    start: eventInfo.event.start,
                    end:
                        eventInfo.event.end ??
                        addHours(eventInfo.event.start, 1),
                },
            },
        }
        function arrayMap(items) {
            return items.map((item) => {
                if (item.id == eventInfo.event.id)
                    return {
                        ...item,
                        start: eventInfo.event.start,
                        end:
                            eventInfo.event.end ??
                            addHours(eventInfo.event.start, 1),
                    }
                else return item
            })
        }
        // only sessions have items
        if (eventInfo.event.extendedProps.item) {
            setSessions(arrayMap(sessions))
            updateSession(data)
        } else {
            setTimeBlocks(arrayMap(timeBlocks))
            updateTimeBlock(data)
        }
    }

    // *****************************************
    // *
    // * Event actions
    // *
    // *****************************************
    function eventClick(eventInfo) {
        eventInfo.jsEvent.preventDefault()
        modalRef.current.openModal()
        setModalEvent(eventInfo.event)
    }
    // *****************************************
    // * DELETE event
    // *****************************************
    const [deleteTimeBlock] = useMutation<
        DeleteTimeBlockMutation,
        DeleteTimeBlockMutationVariables
    >(DELETE_TIME_BLOCK, {
        onCompleted: () => {
            toast.success("Time block deleted!")
        },
    })
    const [deleteSession] = useMutation<
        DeleteSessionMutation,
        DeleteSessionMutationVariables
    >(DELETE_SESSION, {
        onCompleted: () => {
            toast.success("Session deleted!")
        },
    })
    function deleteEvent() {
        const id = parseInt(modalEvent.id)
        const data = {
            variables: {
                id,
            },
        }
        // only sessions have items
        if (modalEvent.extendedProps.item) {
            setSessions(sessions.filter((session) => session.id != id))
            deleteSession(data)
        } else {
            setTimeBlocks(timeBlocks.filter((block) => block.id != id))
            deleteTimeBlock(data)
        }
        modalRef.current.closeModal()
    }
    // *****************************************
    // * DUPLICATE event
    // *****************************************
    const [createSession] = useMutation<
        CreateSessionMutation,
        CreateSessionMutationVariables
    >(CREATE_SESSION, {
        onCompleted: () => {
            toast.success("Session created!")
        },
    })
    async function copyEvent() {
        modalRef.current.closeModal()
        const res = await createSession({
            variables: {
                input: {
                    type: "PLANNED" as SessionType,
                    start: modalEvent.start,
                    end: modalEvent.end,
                    itemId: modalEvent.extendedProps.item.id,
                },
            },
        })
        setSessions([
            ...sessions,
            {
                ...res.data.createSession,
                title: res.data.createSession.item.name,
            },
        ])
    }
    // *****************************************
    // * TRACK event
    // *****************************************
    async function trackEvent() {
        const id = parseInt(modalEvent.id)
        modalRef.current.closeModal()

        updateSession({
            variables: {
                id,
                input: {
                    type: "TRACKED",
                },
            },
        })
        setSessions(
            sessions.map((session) => {
                if (session.id == id)
                    return {
                        ...session,
                        type: "TRACKED",
                    }
                return session
            })
        )
    }

    // *****************************************
    // *
    // * Calculate task fitting
    // *
    // *****************************************
    const queryTasks = useQuery(QUERY_TASKS)

    const [createSessions] = useMutation<
        CreateSessionsMutation,
        CreateSessionsMutationVariables
    >(CREATE_SESSIONS, {
        onCompleted: () => {
            toast.success("Sessions created!")
        },
        refetchQueries: [
            {
                query: QUERY_SESSIONS,
                variables: {
                    start: currentStart,
                    end: currentEnd,
                },
            },
        ],
        awaitRefetchQueries: true,
    })
    const [deleteSessions] = useMutation<
        DeleteSessionsMutation,
        DeleteSessionsMutationVariables
    >(DELETE_SESSIONS)

    function recalculate() {
        const copyTimeBlocks = timeBlocks
            .filter((block) => isBefore(new Date(), block.start))
            .map((block) => {
                const timePlanned = 0
                const totalTime = differenceInMinutes(block.end, block.start)
                const timeRemaining = totalTime - timePlanned
                return {
                    ...block,
                    sessions: [],
                    timePlanned,
                    timeRemaining,
                    totalTime,
                }
            })

        deleteSessions({
            variables: {
                ids: sessions
                    .filter(
                        (s) =>
                            (isBefore(copyTimeBlocks[0].start, s.start) ||
                                isEqual(copyTimeBlocks[0].start, s.start)) &&
                            s.type == ("PLANNED" as SessionType)
                    )
                    .map((s) => s.id),
            },
        })

        const tasks = queryTasks.data.tasks
            .filter((task: Item) => task.estimatedTime != null)
            .map((task: Item) => {
                const data = { ...task, timeRemaining: task.estimatedTime }
                if (task.minBlockTime && !task.maxBlockTime)
                    data.maxBlockTime = task.estimatedTime
                if (task.sessions.length > 0) {
                    task.sessions
                        .filter((s) =>
                            isBefore(s.start, copyTimeBlocks[0].start)
                        )
                        .forEach((s) => {
                            const diff = differenceInMinutes(s.end, s.start)
                            if (data.timeRemaining > diff)
                                data.timeRemaining -= diff
                            else data.timeRemaining = 0
                        })
                }
                return data
            })

        const newSessions = []
        copyTimeBlocks.map((block) => {
            for (let i = 0; i < tasks.length; i++) {
                // assuming minBlockTime == estimatedTime if none is given
                let sessionLength = 0
                if (tasks[i].timeRemaining > 0 && block.timeRemaining > 0) {
                    if (
                        !tasks[i].minBlockTime &&
                        tasks[i].timeRemaining <= block.timeRemaining
                    )
                        sessionLength = tasks[i].timeRemaining
                    else if (
                        tasks[i].minBlockTime &&
                        tasks[i].minBlockTime <= block.timeRemaining
                    ) {
                        if (
                            tasks[i].timeRemaining <= block.timeRemaining &&
                            tasks[i].maxBlockTime >= tasks[i].timeRemaining
                        )
                            sessionLength = tasks[i].timeRemaining
                        else if (
                            tasks[i].maxBlockTime <= block.timeRemaining &&
                            (tasks[i].timeRemaining - tasks[i].maxBlockTime ==
                                0 ||
                                tasks[i].timeRemaining -
                                    tasks[i].maxBlockTime >=
                                    tasks[i].minBlockTime)
                        )
                            sessionLength = tasks[i].maxBlockTime
                        else if (tasks[i].maxBlockTime > block.timeRemaining)
                            sessionLength = Math.min(
                                tasks[i].timeRemaining - tasks[i].minBlockTime,
                                block.timeRemaining
                            )
                    }
                }
                if (sessionLength > 0) {
                    const start = addMinutes(block.start, block.timePlanned)
                    const end = addMinutes(start, sessionLength)
                    newSessions.push({
                        type: "PLANNED" as SessionType,
                        start,
                        end,
                        itemId: tasks[i].id,
                    })
                    block.timePlanned += sessionLength
                    block.timeRemaining -= sessionLength
                    tasks[i].timeRemaining -= sessionLength
                }
            }
        })
        createSessions({
            variables: {
                input: newSessions,
            },
        })
    }

    return (
        <>
            <Metadata title="Calendar" description="Dashboard calendar" />
            <div className="flex gap-10">
                <div id="calendar-wrapper" className="w-full">
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="mb-0">Calendar</h1>
                        <div className="flex gap-4">
                            {timeBlocks.length > 0 ? (
                                <button onClick={recalculate}>
                                    <Icon icon="gravity-ui:arrows-rotate-left" />{" "}
                                    Recalculate
                                </button>
                            ) : null}
                            <button onClick={showTimeBlockSidebar}>
                                <Icon icon="gravity-ui:square-bars-vertical" />{" "}
                                Time Block
                            </button>
                        </div>
                    </div>
                    <div>
                        <FullCalendar
                            ref={fcRef}
                            plugins={[
                                timeGridPlugin,
                                interactionPlugin,
                                googleCalendarPlugin,
                            ]}
                            initialView="timeGridWeek"
                            weekNumbers
                            allDaySlot={false}
                            dayHeaderContent={renderDayHeaderContent}
                            nowIndicator
                            droppable
                            editable
                            contentHeight="500vh"
                            datesSet={(dateInfo) => {
                                setCurrentStart(dateInfo.start)
                                setCurrentEnd(dateInfo.end)
                            }}
                            snapDuration="00:05:00"
                            slotDuration="00:30:00"
                            expandRows
                            googleCalendarApiKey={googleCalendarApiKey}
                            eventSources={eventSources}
                            eventReceive={eventReceive}
                            eventDrop={eventUpdate}
                            eventResize={eventUpdate}
                            eventClick={eventClick}
                            eventContent={renderEventContent}
                        />
                    </div>
                </div>
                <div id="time-block-sidebar" className="hidden w-1/4 relative">
                    <TimeBlockSidebar />
                </div>
                <CustomModal ref={modalRef}>
                    {modalEvent ? (
                        <>
                            {modalEvent.extendedProps.item ? (
                                <Breadcrumb
                                    item={modalEvent.extendedProps.item.parent}
                                />
                            ) : null}
                            <h2 className="mt-2">{modalEvent.title}</h2>
                            {modalEvent.extendedProps.location ? (
                                <>
                                    <p className="eyebrow">Location</p>
                                    <p className="mb-6">
                                        {modalEvent.extendedProps.location}
                                    </p>
                                </>
                            ) : null}
                            {modalEvent.extendedProps.notes ? (
                                <>
                                    <p className="eyebrow">Notes</p>
                                    <p className="mb-6">
                                        {modalEvent.extendedProps.notes}
                                    </p>
                                </>
                            ) : null}
                            <div className="flex justify-between w-full">
                                <div className="flex gap-3">
                                    <button
                                        onClick={copyEvent}
                                        className="button--circle"
                                    >
                                        <Icon icon="gravity-ui:copy" />
                                    </button>
                                    <button
                                        onClick={deleteEvent}
                                        className="button--circle"
                                    >
                                        <Icon icon="gravity-ui:trash-bin" />
                                    </button>
                                </div>
                                <button
                                    onClick={trackEvent}
                                    className="button--circle"
                                >
                                    <Icon icon="gravity-ui:circle-check" />
                                </button>
                            </div>
                        </>
                    ) : null}
                </CustomModal>
            </div>
        </>
    )
}

function renderDayHeaderContent(eventInfo) {
    return (
        <div className="flex gap-2 justify-between w-full">
            <span>{format(eventInfo.date, "EEE")}</span>
            <span>{format(eventInfo.date, "MMM dd")}</span>
        </div>
    )
}

function renderEventContent(eventInfo) {
    return (
        <div
            className={
                eventInfo.event.extendedProps.type &&
                eventInfo.event.extendedProps.type == "TRACKED"
                    ? "session--tracked"
                    : ""
            }
        >
            <p className="text-xs mb-1">
                {format(eventInfo.event.start, "h:mm")} -{" "}
                {format(eventInfo.event.end, "h:mm")}
            </p>
            <p>{eventInfo.event.title}</p>
        </div>
    )
}

export default IndexPage
