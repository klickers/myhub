import type {
    QueryResolvers,
    MutationResolvers,
    TimeBlockRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const timeBlocks: QueryResolvers["timeBlocks"] = ({ start, end }) => {
    return db.timeBlock.findMany({
        where: {
            OR: [
                {
                    start: {
                        lte: end,
                        gte: start,
                    },
                },
                {
                    end: {
                        lte: end,
                        gte: start,
                    },
                },
            ],
        },
    })
}

export const timeBlock: QueryResolvers["timeBlock"] = ({ id }) => {
    return db.timeBlock.findUnique({
        where: { id },
    })
}

export const createTimeBlock: MutationResolvers["createTimeBlock"] = ({
    input,
}) => {
    return db.timeBlock.create({
        data: { ...input, userId: context.currentUser.id },
    })
}

export const updateTimeBlock: MutationResolvers["updateTimeBlock"] = ({
    id,
    input,
}) => {
    return db.timeBlock.update({
        data: input,
        where: { id },
    })
}

export const deleteTimeBlock: MutationResolvers["deleteTimeBlock"] = ({
    id,
}) => {
    return db.timeBlock.delete({
        where: { id },
    })
}

export const TimeBlock: TimeBlockRelationResolvers = {
    type: (_obj, { root }) => {
        return db.timeBlock.findUnique({ where: { id: root?.id } }).type()
    },
    user: (_obj, { root }) => {
        return db.timeBlock.findUnique({ where: { id: root?.id } }).user()
    },
}
