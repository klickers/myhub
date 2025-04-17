import { useEffect, useState } from "react"

import type { SkillsQuery, SkillsQueryVariables, Item } from "types/graphql"

import { NavLink, routes } from "@redwoodjs/router"
import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import CreateSkill from "../CreateSkill/CreateSkill"

export const QUERY: TypedDocumentNode<SkillsQuery, SkillsQueryVariables> = gql`
    query SkillsQuery {
        skills {
            id
            name
            parents {
                parentId
            }
        }
    }
`

export const Loading = () => (
    <div className="mb-6 rounded-3xl border border-black p-6">
        <p>Loading skills...</p>
    </div>
)

export const Empty = () => (
    <>
        <CreateSkill
            query={{
                query: QUERY,
            }}
            skills={[]}
        />
        <div className="mt-6 rounded-3xl border border-black p-6">
            <p>Create a skill!</p>
        </div>
    </>
)

export const Failure = ({ error }: CellFailureProps<SkillsQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    skills,
}: CellSuccessProps<SkillsQuery, SkillsQueryVariables>) => {
    /*const [skillsList, setSkillsList] = useState([])

    useEffect(() => {
        const newSkills = []
        const skillRecur = (skill: Item, depth: number = 0) => {
            newSkills.push({
                ...skill,
                depth,
            })
            if (skill.children != null)
                skill.children.forEach((child) => {
                    if (child.type == ("FOLDER" as ItemType))
                        skillRecur(child, depth + 1)
                })
        }
        skills
            .filter((skill: Item) => skill.parent == null)
            .forEach((skill: Item) => skillRecur(skill, 0))
        setSkillsList(newSkills)
    }, [skills])*/

    return (
        <>
            <CreateSkill
                query={{
                    query: QUERY,
                }}
                skills={skills as Item[]}
            />
            <div className="mt-6 rounded-3xl border border-black p-6">
                <ul className="skills space-y-1">
                    {skills.map((item) => (
                        <li key={item.id}>
                            <NavLink to="#!" activeClassName="active-link">
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
