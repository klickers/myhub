import type {
    QueryResolvers,
    MutationResolvers,
    ItemStatusRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const itemStatuses: QueryResolvers["itemStatuses"] = () => {
    return db.itemStatus.findMany()
}

export const itemStatus: QueryResolvers["itemStatus"] = ({ id }) => {
    return db.itemStatus.findUnique({
        where: { id },
    })
}

export const createItemStatus: MutationResolvers["createItemStatus"] = ({
    input,
}) => {
    return db.itemStatus.create({
        data: input,
    })
}

export const updateItemStatus: MutationResolvers["updateItemStatus"] = ({
    id,
    input,
}) => {
    return db.itemStatus.update({
        data: input,
        where: { id },
    })
}

export const deleteItemStatus: MutationResolvers["deleteItemStatus"] = ({
    id,
}) => {
    return db.itemStatus.delete({
        where: { id },
    })
}

export const ItemStatus: ItemStatusRelationResolvers = {
    items: (_obj, { root }) => {
        return db.itemStatus.findUnique({ where: { id: root?.id } }).items()
    },
}
