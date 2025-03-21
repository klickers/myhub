import type {
    QueryResolvers,
    MutationResolvers,
    SessionRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const sessions: QueryResolvers["sessions"] = () => {
    return db.session.findMany({ where: { userId: context.currentUser.id } })
}

export const session: QueryResolvers["session"] = ({ id }) => {
    return db.session.findUnique({
        where: { id, userId: context.currentUser.id },
    })
}

export const createSession: MutationResolvers["createSession"] = ({
    input,
}) => {
    return db.session.create({
        data: { ...input, userId: context.currentUser.id },
    })
}

export const updateSession: MutationResolvers["updateSession"] = ({
    id,
    input,
}) => {
    return db.session.update({
        data: input,
        where: { id, userId: context.currentUser.id },
    })
}

export const deleteSession: MutationResolvers["deleteSession"] = ({ id }) => {
    return db.session.delete({
        where: { id, userId: context.currentUser.id },
    })
}

export const Session: SessionRelationResolvers = {
    user: (_obj, { root }) => {
        return db.session.findUnique({ where: { id: root?.id } }).user()
    },
    item: (_obj, { root }) => {
        return db.session.findUnique({ where: { id: root?.id } }).item()
    },
}
