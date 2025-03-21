import type {
    QueryResolvers,
    MutationResolvers,
    TimeBlockTypeRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const timeBlockTypes: QueryResolvers["timeBlockTypes"] = () => {
    return db.timeBlockType.findMany({
        where: { userId: context.currentUser.id },
    })
}

export const timeBlockType: QueryResolvers["timeBlockType"] = ({ id }) => {
    return db.timeBlockType.findUnique({
        where: { id },
    })
}

export const createTimeBlockType: MutationResolvers["createTimeBlockType"] = ({
    input,
}) => {
    return db.timeBlockType.create({
        data: { ...input, userId: context.currentUser.id },
    })
}

export const updateTimeBlockType: MutationResolvers["updateTimeBlockType"] = ({
    id,
    input,
}) => {
    return db.timeBlockType.update({
        data: input,
        where: { id, userId: context.currentUser.id },
    })
}

export const deleteTimeBlockType: MutationResolvers["deleteTimeBlockType"] = ({
    id,
}) => {
    return db.timeBlockType.delete({
        where: { id, userId: context.currentUser.id },
    })
}

export const TimeBlockType: TimeBlockTypeRelationResolvers = {
    user: (_obj, { root }) => {
        return db.timeBlockType.findUnique({ where: { id: root?.id } }).user()
    },
    timeBlocks: (_obj, { root }) => {
        return db.timeBlockType
            .findUnique({ where: { id: root?.id } })
            .timeBlocks()
    },
}
