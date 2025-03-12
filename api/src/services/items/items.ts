import type {
    QueryResolvers,
    MutationResolvers,
    ItemRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const items: QueryResolvers["items"] = () => {
    return db.item.findMany()
}

export const item: QueryResolvers["item"] = ({ id }) => {
    return db.item.findUnique({
        where: { id },
    })
}

export const createItem: MutationResolvers["createItem"] = ({ input }) => {
    return db.item.create({
        data: input,
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
