import TimeBlockTypesCell from "src/components/Calendar/TimeBlockTypesCell"

const TimeBlockSidebar = () => {
    return (
        <div className="w-1/4 fixed top-0 right-0 p-8 bg-white h-screen border-l border-gray-200">
            <h2>Time Blocking</h2>
            <TimeBlockTypesCell />
        </div>
    )
}

export default TimeBlockSidebar
