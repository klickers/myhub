import type {
    QueryResolvers,
    MutationResolvers,
    ItemStatusRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const itemStatuses: QueryResolvers["itemStatuses"] = () => {
    return db.itemStatus.findMany({ where: { userId: context.currentUser.id } })
}

export const itemStatus: QueryResolvers["itemStatus"] = ({ id }) => {
    return db.itemStatus.findUnique({
        where: { id, userId: context.currentUser.id },
    })
}

export const createItemStatus: MutationResolvers["createItemStatus"] = ({
    input,
}) => {
    return db.itemStatus.create({
        data: { ...input, userId: context.currentUser.id },
    })
}

export const updateItemStatus: MutationResolvers["updateItemStatus"] = ({
    id,
    input,
}) => {
    return db.itemStatus.update({
        data: input,
        where: { id, userId: context.currentUser.id },
    })
}

export const deleteItemStatus: MutationResolvers["deleteItemStatus"] = ({
    id,
}) => {
    return db.itemStatus.delete({
        where: { id, userId: context.currentUser.id },
    })
}

export const ItemStatus: ItemStatusRelationResolvers = {
    user: (_obj, { root }) => {
        return db.itemStatus.findUnique({ where: { id: root?.id } }).user()
    },
    items: (_obj, { root }) => {
        return db.itemStatus.findUnique({ where: { id: root?.id } }).items()
    },
}
