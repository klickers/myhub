import type {
    QueryResolvers,
    MutationResolvers,
    GoogleCalendarLinkRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const googleCalendarLinks: QueryResolvers["googleCalendarLinks"] =
    () => {
        return db.googleCalendarLink.findMany({
            where: { userId: context.currentUser.id },
        })
    }

export const googleCalendarLink: QueryResolvers["googleCalendarLink"] = ({
    id,
}) => {
    return db.googleCalendarLink.findUnique({
        where: { id, userId: context.currentUser.id },
    })
}

export const createGoogleCalendarLink: MutationResolvers["createGoogleCalendarLink"] =
    ({ input }) => {
        return db.googleCalendarLink.create({
            data: { ...input, userId: context.currentUser.id },
        })
    }

export const updateGoogleCalendarLink: MutationResolvers["updateGoogleCalendarLink"] =
    ({ id, input }) => {
        return db.googleCalendarLink.update({
            data: input,
            where: { id, userId: context.currentUser.id },
        })
    }

export const deleteGoogleCalendarLink: MutationResolvers["deleteGoogleCalendarLink"] =
    ({ id }) => {
        return db.googleCalendarLink.delete({
            where: { id, userId: context.currentUser.id },
        })
    }

export const GoogleCalendarLink: GoogleCalendarLinkRelationResolvers = {
    user: (_obj, { root }) => {
        return db.googleCalendarLink
            .findUnique({ where: { id: root?.id } })
            .user()
    },
}
