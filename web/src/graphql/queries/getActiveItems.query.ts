import { gql } from "@apollo/client"

export const QUERY_ACTIVE_ITEMS = gql`
    query ActiveItemsQuery {
        activeItems {
            id
            __typename
            name
            type
            status {
                name
            }
        }
    }
`
