import type {
    QueryResolvers,
    MutationResolvers,
    ItemRelationResolvers,
    StatusCode,
} from "types/graphql"
import { ItemType } from "types/graphql"

import { db } from "src/lib/db"

export const items: QueryResolvers["items"] = () => {
    return db.item.findMany({ where: { userId: context.currentUser.id } })
}

export const item: QueryResolvers["item"] = ({ id, slug }) => {
    return db.item.findFirst({
        where: {
            ...(id && { id }),
            ...(slug && { slug }),
            userId: context.currentUser.id,
        },
    })
}

export const folders: QueryResolvers["folders"] = () => {
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

export const folder: QueryResolvers["folder"] = ({ slug }) => {
    return db.item.findFirst({
        where: {
            slug,
            type: "FOLDER" as ItemType,
            userId: context.currentUser.id,
        },
    })
}

export const projects: QueryResolvers["projects"] = ({ parentSlug }) => {
    return db.item.findMany({
        where: {
            type: "PROJECT" as ItemType,
            userId: context.currentUser.id,
            parent: {
                slug: parentSlug,
            },
        },
        orderBy: [
            {
                dueDate: {
                    sort: "asc",
                    nulls: "last",
                },
            },
            {
                startDate: {
                    sort: "asc",
                    nulls: "last",
                },
            },
            { name: "asc" },
        ],
        include: {
            parent: true,
        },
    })
}

export const project: QueryResolvers["project"] = ({ slug }) => {
    return db.item.findFirst({
        where: {
            slug,
            type: "PROJECT" as ItemType,
            userId: context.currentUser.id,
        },
    })
}

export const tasks: QueryResolvers["tasks"] = ({ parentSlug, statusCodes }) => {
    const codes = statusCodes
        ? statusCodes.map((code: StatusCode) => {
              return { status: { code } }
          })
        : []
    return db.item.findMany({
        where: {
            type: "TASK" as ItemType,
            userId: context.currentUser.id,
            ...(parentSlug && {
                parent: {
                    slug: parentSlug,
                },
            }),
            ...(statusCodes && { OR: [...codes, { status: null }] }),
        },
        orderBy: [
            {
                dueDate: {
                    sort: "asc",
                    nulls: "last",
                },
            },
            {
                softDueDate: {
                    sort: "asc",
                    nulls: "last",
                },
            },
            {
                startDate: {
                    sort: "asc",
                    nulls: "last",
                },
            },
            { estimatedTime: "desc" },
            { name: "asc" },
        ],
        include: {
            parent: true,
            status: true,
        },
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
    sessions: (_obj, { root }) => {
        return db.item.findUnique({ where: { id: root?.id } }).sessions()
    },
}
