import { useRef } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import Select from "react-select"
import { Item } from "types/graphql"

import { useQuery } from "@redwoodjs/web"

import { QUERY_ACTIVE_ITEMS } from "src/graphql/queries/getActiveItems.query"

const PlayTimeEntry = () => {
    const selectRef = useRef(null)

    const queryItems = useQuery(QUERY_ACTIVE_ITEMS)

    const playItem = () => {
        // TODO: handle play item
    }

    return (
        <div className="space-y-4">
            <div className="bg-gray-100 rounded-3xl pt-4 pb-2 px-6 flex gap-3">
                <p>00:00:00</p>
                <p>Nothing tracking at the moment.</p>
            </div>
            <div className="flex gap-3 w-full items-center">
                <button className="button--circle" onClick={playItem}>
                    <Icon icon="gravity-ui:play" />
                </button>
                <Select
                    ref={selectRef}
                    name="itemId"
                    className="select"
                    placeholder="Select"
                    options={queryItems.data?.activeItems.map((item: Item) => ({
                        value: item.id,
                        label: `${item.name} (${item.type})${item.status ? ` - ${item.status.name}` : ""}`,
                    }))}
                    classNames={{
                        control: (state) => (state.isFocused ? "focused" : ""),
                        menuList: () => "menu-list",
                    }}
                    required
                />
            </div>
            <div className="">
                <textarea name="notes" placeholder="Session notes" />
            </div>
        </div>
    )
}

export default PlayTimeEntry
