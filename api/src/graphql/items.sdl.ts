export const schema = gql`
    type Item {
        id: String!
        type: ItemType!
        name: String!
        slug: String!
        description: String
        notes: String
        startDate: DateTime
        softDueDate: DateTime
        dueDate: DateTime
        estimatedTime: Int
        minBlockTime: Int
        maxBlockTime: Int
        maxBlockTimePerDay: Int
        parentId: String
        statusId: Int
        userId: String!
        parent: Item
        children: [Item]!
        status: ItemStatus
        user: User!
        sessions: [Session]!
        parents: [Item]!
        childrenExplicit: [Item]!
    }

    enum ItemType {
        FOLDER
        TASK

        SKILL
        CAMPAIGN
        QUEST
    }

    type Query {
        items: [Item!]! @requireAuth
        activeItems: [Item!]! @requireAuth
        item(id: String, slug: String): Item @requireAuth

        folders: [Item!]! @requireAuth
        folder(slug: String!): Item @requireAuth

        projects(parentSlug: String!): [Item!]! @requireAuth
        project(id: String!): Item @requireAuth

        tasks(parentSlug: String, statusCodes: [StatusCode]): [Item!]!
            @requireAuth

        skills: [Item!]! @requireAuth

        quests: [Item!]! @requireAuth
    }

    input CreateItemInput {
        type: ItemType!
        name: String!
        slug: String!
        description: String
        notes: String
        startDate: DateTime
        softDueDate: DateTime
        dueDate: DateTime
        estimatedTime: Int
        minBlockTime: Int
        maxBlockTime: Int
        maxBlockTimePerDay: Int
        parentId: String
        statusId: Int
        userId: String
        parents: [String]
    }

    input UpdateItemInput {
        type: ItemType
        name: String
        slug: String
        description: String
        notes: String
        startDate: DateTime
        softDueDate: DateTime
        dueDate: DateTime
        estimatedTime: Int
        minBlockTime: Int
        maxBlockTime: Int
        maxBlockTimePerDay: Int
        parentId: String
        statusId: Int
        userId: String
        parents: [String]
    }

    type Mutation {
        createItem(input: CreateItemInput!, parents: [String]): Item!
            @requireAuth
        updateItem(id: String!, input: UpdateItemInput!): Item! @requireAuth
        deleteItem(id: String!): Item! @requireAuth
    }
`
