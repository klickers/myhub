import { useEffect, useMemo, useState } from "react"

import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { BlockNoteView } from "@blocknote/mantine"
import { Icon } from "@iconify/react/dist/iconify.js"
import type {
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables,
    Item,
    UpdateProjectMutation,
    UpdateProjectMutationVariables,
} from "types/graphql"

import { Link } from "@redwoodjs/router"
import { routes } from "@redwoodjs/router"
import {
    type CellSuccessProps,
    type CellFailureProps,
    type TypedDocumentNode,
    Metadata,
    useMutation,
} from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import Breadcrumb from "../Breadcrumb/Breadcrumb"

import "@blocknote/mantine/style.css"
import "../../../styles/blocknote.scss"

const debounce = (fn: Function, ms = 500) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}

const UPDATE_PROJECT = gql`
    mutation UpdateProjectMutation($id: String!, $input: UpdateItemInput!) {
        updateItem(id: $id, input: $input) {
            id
        }
    }
`

export const QUERY: TypedDocumentNode<
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables
> = gql`
    query FindProjectHeaderQuery($slug: String!) {
        project(slug: $slug) {
            id
            name
            slug
            description
            notes
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const [initialContent, setInitialContent] = useState<
        PartialBlock[] | undefined | "loading"
    >(JSON.parse(project.notes) as PartialBlock[])

    useEffect(() => {
        setInitialContent(JSON.parse(project.notes) as PartialBlock[])
    }, [project])

    const editor = useMemo(() => {
        if (initialContent === "loading") return undefined
        return BlockNoteEditor.create({ initialContent })
    }, [initialContent])

    const debouncedSave = React.useRef(
        debounce(async (editor: BlockNoteEditor) => {
            if (editor)
                update({
                    variables: {
                        id: project.id,
                        input: {
                            notes: JSON.stringify(editor.document),
                        },
                    },
                })
        }, 500)
    ).current

    const [update] = useMutation<
        UpdateProjectMutation,
        UpdateProjectMutationVariables
    >(UPDATE_PROJECT, {
        onCompleted: () => {
            toast.success("Document updated!")
        },
    })

    if (editor === undefined) {
        return "Loading content..."
    }

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
                        <BlockNoteView
                            editor={editor}
                            onChange={() => debouncedSave(editor)}
                        />
                    </div>
                </div>
            ) : null}
        </>
    )
}
