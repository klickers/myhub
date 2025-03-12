import { Metadata } from "@redwoodjs/web"

import { useAuth } from "src/auth"

const IndexPage = () => {
    const { currentUser } = useAuth()
    return (
        <>
            <Metadata
                title="Dashboard"
                description="Your creativity and productivity dashboard."
            />

            <h1>Welcome, {currentUser.firstName}!</h1>
        </>
    )
}

export default IndexPage
