import { useEffect, useState } from "react"

import type {
    FoldersQuery,
    FoldersQueryVariables,
    Item,
    ItemType,
} from "types/graphql"

import { NavLink, routes } from "@redwoodjs/router"
import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import CreateFolder from "../CreateFolder/CreateFolder"

export const QUERY: TypedDocumentNode<FoldersQuery, FoldersQueryVariables> =
    gql`
        query FoldersQuery {
            folders {
                id
                name
                slug
                parent {
                    id
                }
                children {
                    id
                    name
                    slug
                    type
                }
            }
        }
    `

export const Loading = () => (
    <div className="mb-6 rounded-3xl bg-gray-100 py-6 px-3">
        <p>Loading folders...</p>
    </div>
)

export const Empty = () => (
    <div className="mb-6 rounded-3xl bg-gray-100 py-6 px-3">
        <p>Create a folder!</p>
    </div>
)

export const Failure = ({ error }: CellFailureProps<FoldersQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    folders,
}: CellSuccessProps<FoldersQuery, FoldersQueryVariables>) => {
    const [foldersList, setFoldersList] = useState([])

    useEffect(() => {
        const newFolders = []
        const folderRecur = (folder: Item, depth: number = 0) => {
            newFolders.push({
                ...folder,
                depth,
            })
            if (folder.children != null)
                folder.children.forEach((child) => {
                    if (child.type == ("FOLDER" as ItemType))
                        folderRecur(child, depth + 1)
                })
        }
        folders
            .filter((folder: Item) => folder.parent == null)
            .forEach((folder: Item) => folderRecur(folder, 0))
        setFoldersList(newFolders)
    }, [folders])

    return (
        <>
            <div className="mb-6 rounded-3xl bg-gray-100 py-6 px-3">
                <ul className="folders">
                    {foldersList.map((item) => (
                        <li
                            key={item.slug}
                            style={{ marginLeft: item.depth + "rem" }}
                        >
                            <NavLink
                                to={routes.workspaceFolder({ slug: item.slug })}
                                activeClassName="active-link"
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <CreateFolder
                query={{
                    query: QUERY,
                }}
                folders={folders}
            />
        </>
    )
}
