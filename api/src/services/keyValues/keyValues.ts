import type {
    QueryResolvers,
    MutationResolvers,
    KeyValueRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const keyValues: QueryResolvers["keyValues"] = () => {
    return db.keyValue.findMany({ where: { userId: context.currentUser.id } })
}

export const keyValue: QueryResolvers["keyValue"] = ({ key }) => {
    return db.keyValue.findUnique({
        where: { key, userId: context.currentUser.id },
    })
}

export const createKeyValue: MutationResolvers["createKeyValue"] = ({
    input,
}) => {
    return db.keyValue.create({
        data: { ...input, userId: context.currentUser.id },
    })
}

export const updateKeyValue: MutationResolvers["updateKeyValue"] = ({
    key,
    input,
}) => {
    return db.keyValue.update({
        data: input,
        where: { key, userId: context.currentUser.id },
    })
}

export const deleteKeyValue: MutationResolvers["deleteKeyValue"] = ({
    key,
}) => {
    return db.keyValue.delete({
        where: { key, userId: context.currentUser.id },
    })
}

export const KeyValue: KeyValueRelationResolvers = {
    user: (_obj, { root }) => {
        return db.keyValue.findUnique({ where: { key: root?.key } }).user()
    },
}
