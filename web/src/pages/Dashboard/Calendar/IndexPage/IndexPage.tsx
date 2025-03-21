import { useEffect, useRef, useState } from "react"

import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
    addHours,
    differenceInMinutes,
    endOfWeek,
    format,
    startOfWeek,
} from "date-fns"
import {
    CreateTimeBlockMutation,
    CreateTimeBlockMutationVariables,
    Item,
    UpdateTimeBlockMutation,
    UpdateTimeBlockMutationVariables,
} from "types/graphql"

import { Metadata, useMutation, useQuery } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import TimeBlockSidebar from "../../../../components/Calendar/TimeBlockSidebar/TimeBlockSidebar"

const QUERY_TASKS = gql`
    query CalendarTasksQuery {
        tasks {
            id
            name
            softDueDate
            dueDate
            estimatedTime
            minBlockTime
            maxBlockTime
            maxBlockTimePerDay
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

const IndexPage = () => {
    const fcRef = useRef(null)

    const [calendarApi, setCalendarApi] = useState(null)
    const [currentStart, setCurrentStart] = useState(startOfWeek(new Date()))
    const [currentEnd, setCurrentEnd] = useState(endOfWeek(new Date()))

    useEffect(() => {
        setCalendarApi(fcRef.current.getApi())
        setCurrentStart(fcRef.current.getApi().view.currentStart)
        setCurrentEnd(fcRef.current.getApi().view.currentEnd)
    }, [fcRef])

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
    // * Get time block events
    // *
    // *****************************************
    const queryTimeBlocks = useQuery(QUERY_TIME_BLOCKS, {
        variables: {
            start: currentStart,
            end: currentEnd,
        },
    })
    function timeBlocks() {
        return queryTimeBlocks.data
            ? queryTimeBlocks.data.timeBlocks.map((block) => {
                  return { ...block, title: block.type.name }
              })
            : []
    }

    // *****************************************
    // *
    // * Create time block (eventReceive)
    // *
    // *****************************************
    const [onEventReceive] = useMutation<
        CreateTimeBlockMutation,
        CreateTimeBlockMutationVariables
    >(CREATE_TIME_BLOCK, {
        onCompleted: () => {
            toast.success("Time block created!")
        },
        /*refetchQueries: [
            {
                query: QUERY_TIME_BLOCKS,
                variables: {
                    start: currentStart,
                    end: currentEnd,
                },
            },
        ],
        awaitRefetchQueries: true,*/
    })
    async function eventReceive(eventInfo) {
        const res = await onEventReceive({
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
        eventInfo.event.setProp("id", res.data.createTimeBlock.id)
    }

    // *******************************************
    // *
    // * Update time block (eventDrop, eventResize)
    // *
    // *******************************************
    const [onEventUpdate] = useMutation<
        UpdateTimeBlockMutation,
        UpdateTimeBlockMutationVariables
    >(UPDATE_TIME_BLOCK, {
        onCompleted: () => {
            toast.success("Time block updated!")
        },
        refetchQueries: [
            {
                query: QUERY_TIME_BLOCKS,
                variables: {
                    start: currentStart,
                    end: currentEnd,
                },
            },
        ],
        awaitRefetchQueries: true,
    })
    function eventUpdate(eventInfo) {
        onEventUpdate({
            variables: {
                id: parseInt(eventInfo.event.id),
                input: {
                    start: eventInfo.event.start,
                    end:
                        eventInfo.event.end ??
                        addHours(eventInfo.event.start, 1),
                },
            },
        })
    }

    // *****************************************
    // *
    // * Calculate task fitting
    // *
    // *****************************************
    const queryTasks = useQuery(QUERY_TASKS)

    function recalculate() {
        const tasks = queryTasks.data.tasks
            .filter((task: Item) => task.estimatedTime != null)
            .map((task: Item) => {
                if (task.minBlockTime && !task.maxBlockTime)
                    task.maxBlockTime = task.estimatedTime
                return { ...task, timeRemaining: task.estimatedTime }
            })

        let { timeBlocks } = queryTimeBlocks.data
        timeBlocks = timeBlocks.map((block) => {
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

        // start from time now (to nearest quarter)
        // take sorted tasks to distribute

        timeBlocks.forEach((block) => {
            for (let i = 0; i < tasks.length; i++) {
                // assuming minBlockTime == estimatedTime if none is given
                // assuming maxBlockTime == estimatedTime if only minBlockTime given
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
                    block.sessions.push({
                        name: tasks[i].name,
                        minBlockTime: tasks[i].minBlockTime,
                        maxBlockTime: tasks[i].maxBlockTime,
                        sessionLength,
                    })
                    block.timePlanned += sessionLength
                    block.timeRemaining -= sessionLength
                    tasks[i].timeRemaining -= sessionLength
                }
            }
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
                            <button onClick={recalculate}>
                                <Icon icon="gravity-ui:arrows-rotate-left" />{" "}
                                Recalculate
                            </button>
                            <button onClick={showTimeBlockSidebar}>
                                <Icon icon="gravity-ui:square-bars-vertical" />{" "}
                                Time Block
                            </button>
                        </div>
                    </div>
                    <div>
                        <FullCalendar
                            ref={fcRef}
                            plugins={[timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            weekNumbers
                            allDaySlot={false}
                            dayHeaderContent={renderDayHeaderContent}
                            nowIndicator
                            snapDuration="00:15:00"
                            droppable
                            editable
                            datesSet={(dateInfo) => {
                                setCurrentStart(dateInfo.start)
                                setCurrentEnd(dateInfo.end)
                            }}
                            eventSources={[
                                {
                                    id: "0",
                                    events: timeBlocks(),
                                    className: ["event--time-block"],
                                },
                            ]}
                            eventReceive={eventReceive}
                            eventDrop={eventUpdate}
                            eventResize={eventUpdate}
                        />
                    </div>
                </div>
                <div id="time-block-sidebar" className="hidden w-1/4 relative">
                    <TimeBlockSidebar />
                </div>
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

export default IndexPage
