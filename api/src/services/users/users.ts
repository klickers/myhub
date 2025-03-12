import type {
    QueryResolvers,
    MutationResolvers,
    UserRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const users: QueryResolvers["users"] = () => {
    return db.user.findMany()
}

export const user: QueryResolvers["user"] = ({ clerkId }) => {
    return db.user.findUnique({
        where: { clerkId },
    })
}

export const createUser: MutationResolvers["createUser"] = ({ input }) => {
    return db.user.create({
        data: input,
    })
}

export const updateUser: MutationResolvers["updateUser"] = ({
    clerkId,
    input,
}) => {
    return db.user.update({
        data: input,
        where: { clerkId },
    })
}

export const deleteUser: MutationResolvers["deleteUser"] = ({ clerkId }) => {
    return db.user.delete({
        where: { clerkId },
    })
}

export const User: UserRelationResolvers = {
    items: (_obj, { root }) => {
        return db.user.findUnique({ where: { clerkId: root?.clerkId } }).items()
    },
}
