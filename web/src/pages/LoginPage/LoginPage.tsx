import {
    Form,
    EmailField,
    PasswordField,
    Submit,
    SubmitHandler,
} from "@redwoodjs/forms"
import { navigate } from "@redwoodjs/router"
import { Link, routes } from "@redwoodjs/router"
import { Metadata } from "@redwoodjs/web"

import { useAuth } from "src/auth"

interface FormValues {
    email: string
    password: string
}

const LoginPage = () => {
    const { logIn } = useAuth()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await logIn({
            authMethod: "password",
            email: data.email,
            password: data.password,
        })
        navigate(routes.dashboard())
    }

    return (
        <>
            <Metadata title="Login" description="Login page" />
            <main className="mx-auto max-w-lg py-12">
                <h1>Login</h1>
                <Form onSubmit={onSubmit}>
                    <EmailField name="email" placeholder="Email" required />
                    <PasswordField
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <Submit>Login</Submit>
                </Form>
                <p className="mt-6">
                    Don&apos;t have an account yet?{" "}
                    <Link to={routes.register()}>Register here</Link>.
                </p>
            </main>
        </>
    )
}

export default LoginPage
