import { gql } from "@apollo/client"

export const QUERY_SKILLS = gql`
    query SkillsQuery {
        skills {
            __typename
            id
            name
            parents {
                __typename
                id
                type
            }
            childrenExplicit {
                __typename
                id
                type
            }
        }
    }
`
