import { useState } from "react"

import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import type {
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables,
    Item,
} from "types/graphql"

import { Link } from "@redwoodjs/router"
import { routes } from "@redwoodjs/router"
import {
    type CellSuccessProps,
    type CellFailureProps,
    type TypedDocumentNode,
    Metadata,
} from "@redwoodjs/web"

import Breadcrumb from "../Breadcrumb/Breadcrumb"

import "@blocknote/mantine/style.css"

export const QUERY: TypedDocumentNode<
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables
> = gql`
    query FindProjectHeaderQuery($slug: String!) {
        project(slug: $slug) {
            name
            slug
            description
            parent {
                name
                slug
                type
                parent {
                    name
                    slug
                    type
                    parent {
                        name
                        slug
                        type
                    }
                }
            }
        }
    }
`

export const Loading = () => <div>Loading project header...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<FindProjectHeaderQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    project,
}: CellSuccessProps<
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables
>) => {
    const editor = useCreateBlockNote()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <Metadata title={project.name} description={project.description} />
            <p className="flex gap-1">
                {project.parent.parent && project.parent.parent.parent ? (
                    <Breadcrumb item={project.parent.parent.parent as Item} />
                ) : null}
                {project.parent.parent ? (
                    <Breadcrumb item={project.parent.parent as Item} />
                ) : null}
                <Breadcrumb item={project.parent as Item} />
            </p>
            <div className="flex gap-2 float-right">
                <button
                    className="button--circle"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Icon icon="gravity-ui:file-text" />
                </button>
                <Link
                    to={routes.workspaceUpdateProject({ slug: project.slug })}
                    className="button button--circle"
                >
                    <Icon icon="gravity-ui:pencil" />
                </Link>
            </div>
            <h2>{project.name}</h2>
            {isSidebarOpen ? (
                <div id="modal">
                    <div
                        className="fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                    <div className="rounded-l-3xl fixed h-screen w-2/3 right-0 top-0 bg-white overflow-y-scroll">
                        <BlockNoteView editor={editor} />
                    </div>
                </div>
            ) : null}
        </>
    )
}
