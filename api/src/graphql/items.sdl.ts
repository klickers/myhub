export const schema = gql`
    type Item {
        id: String!
        type: ItemType!
        name: String!
        slug: String!
        description: String
        notes: String
        startDate: DateTime
        dueDate: DateTime
        parentId: String
        statusId: Int
        userId: String!
        parent: Item
        children: [Item]!
        status: ItemStatus
        user: User!
    }

    enum ItemType {
        FOLDER
        PROJECT
        TASK
    }

    type Query {
        items: [Item!]! @requireAuth
        folders: [Item!]! @requireAuth
        item(id: String!): Item @requireAuth
    }

    input CreateItemInput {
        type: ItemType!
        name: String!
        slug: String!
        description: String
        notes: String
        startDate: DateTime
        dueDate: DateTime
        parentId: String
        statusId: Int
        userId: String
    }

    input UpdateItemInput {
        type: ItemType
        name: String
        slug: String
        description: String
        notes: String
        startDate: DateTime
        dueDate: DateTime
        parentId: String
        statusId: Int
        userId: String
    }

    type Mutation {
        createItem(input: CreateItemInput!): Item! @requireAuth
        updateItem(id: String!, input: UpdateItemInput!): Item! @requireAuth
        deleteItem(id: String!): Item! @requireAuth
    }
`
