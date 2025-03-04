import {
    Form,
    EmailField,
    PasswordField,
    TextField,
    Submit,
    SubmitHandler,
} from "@redwoodjs/forms"
import { Link, navigate, routes } from "@redwoodjs/router"
import { Metadata } from "@redwoodjs/web"

import { useAuth } from "src/auth"

interface FormValues {
    name: string
    email: string
    password: string
}

const RegisterPage = () => {
    const { signUp } = useAuth()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    first_name: data.name,
                },
            },
        })
        navigate(routes.login())
    }

    return (
        <>
            <Metadata title="Register" description="Registration page" />

            <main className="mx-auto max-w-lg py-12">
                <h1>Register</h1>
                <Form onSubmit={onSubmit}>
                    <TextField name="name" placeholder="First Name" required />
                    <EmailField name="email" placeholder="Email" required />
                    <PasswordField
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <Submit>Register</Submit>
                </Form>
                <p className="mt-6">
                    Already have an account?{" "}
                    <Link to={routes.login()}>Login here</Link>.
                </p>
            </main>
        </>
    )
}

export default RegisterPage
