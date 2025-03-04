import { Metadata } from "@redwoodjs/web"

const LandingPage = () => {
    return (
        <>
            <Metadata
                title="Home"
                description="Welcome to your personal hub."
            />
            <div className="text-center pt-6 pb-12 min-h-screen flex flex-col justify-center items-center">
                <h1>Welcome to your personal hub.</h1>
                <p className="max-w-lg">
                    Become your best self. An all-in-one, interconnected
                    creativity and productivity workspace.
                </p>
            </div>
        </>
    )
}

export default LandingPage
