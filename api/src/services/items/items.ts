import type {
    QueryResolvers,
    MutationResolvers,
    ItemRelationResolvers,
} from "types/graphql"
import { ItemType } from "types/graphql"

import { db } from "src/lib/db"

export const items: QueryResolvers["items"] = () => {
    return db.item.findMany({ where: { userId: context.currentUser.id } })
}

export const folders: QueryResolvers["items"] = () => {
    return db.item.findMany({
        where: {
            type: "FOLDER" as ItemType,
            userId: context.currentUser.id,
        },
        orderBy: {
            name: "asc",
        },
    })
}

export const item: QueryResolvers["item"] = ({ id }) => {
    return db.item.findUnique({
        where: { id },
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
