import type {
    QueryResolvers,
    MutationResolvers,
    ItemRelationResolvers,
} from "types/graphql"
import { ItemType } from "types/graphql"

import { db } from "src/lib/db"

const userId = context.currentUser.id

export const items: QueryResolvers["items"] = () => {
    return db.item.findMany({ where: { userId } })
}

export const folders: QueryResolvers["folders"] = () => {
    return db.item.findMany({
        where: {
            type: "FOLDER" as ItemType,
            userId,
        },
        orderBy: {
            name: "asc",
        },
    })
}

export const item: QueryResolvers["item"] = ({ id }) => {
    return db.item.findUnique({
        where: { id, userId },
    })
}

export const folder: QueryResolvers["folder"] = ({ slug }) => {
    return db.item.findFirst({
        where: {
            slug,
            type: "FOLDER" as ItemType,
            userId,
        },
    })
}

export const createItem: MutationResolvers["createItem"] = ({ input }) => {
    return db.item.create({
        data: { ...input, userId: context.currentUser.id },
    })
}

export const updateItem: MutationResolvers["updateItem"] = ({ id, input }) => {
    return db.item.update({
        data: input,
        where: { id },
    })
}

export const deleteItem: MutationResolvers["deleteItem"] = ({ id }) => {
    return db.item.delete({
        where: { id },
    })
}

export const Item: ItemRelationResolvers = {
    parent: (_obj, { root }) => {
        return db.item.findUnique({ where: { id: root?.id } }).parent()
    },
    children: (_obj, { root }) => {
        return db.item.findUnique({ where: { id: root?.id } }).children()
    },
    status: (_obj, { root }) => {
        return db.item.findUnique({ where: { id: root?.id } }).status()
    },
    user: (_obj, { root }) => {
        return db.item.findUnique({ where: { id: root?.id } }).user()
    },
}
