import { useEffect } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"

import { routes } from "@redwoodjs/router"
import { navigate } from "@redwoodjs/router"
import { Metadata } from "@redwoodjs/web"

import { useAuth } from "src/auth"

const LandingPage = () => {
    const { isAuthenticated, signUp, logOut } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.dashboard())
        }
    }, [isAuthenticated])

    return (
        <>
            <Metadata
                title="Home"
                description="Welcome to your personal hub."
            />
            <div className="text-center pt-6 pb-12 px-10 h-screen flex flex-col justify-center items-center">
                <h1>Welcome to your personal hub.</h1>
                <p className="max-w-lg">
                    Become your best self. An all-in-one, interconnected
                    creativity and productivity workspace.
                </p>
                <button onClick={() => signUp()} className="mt-3">
                    Get Started <Icon icon="gravity-ui:arrow-right" />
                </button>
            </div>
        </>
    )
}

export default LandingPage
