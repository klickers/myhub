import type {
    QueryResolvers,
    MutationResolvers,
    SettingRelationResolvers,
} from "types/graphql"

import { db } from "src/lib/db"

export const settings: QueryResolvers["settings"] = () => {
    return db.setting.findMany({ where: { userId: context.currentUser.id } })
}

export const setting: QueryResolvers["setting"] = ({ id }) => {
    return db.setting.findUnique({
        where: { id, userId: context.currentUser.id },
    })
}

export const createSetting: MutationResolvers["createSetting"] = ({
    input,
}) => {
    return db.setting.create({
        data: { ...input, userId: context.currentUser.id },
    })
}

export const updateSetting: MutationResolvers["updateSetting"] = ({
    id,
    input,
}) => {
    return db.setting.update({
        data: input,
        where: { id, userId: context.currentUser.id },
    })
}

export const deleteSetting: MutationResolvers["deleteSetting"] = ({ id }) => {
    return db.setting.delete({
        where: { id, userId: context.currentUser.id },
    })
}

export const Setting: SettingRelationResolvers = {
    user: (_obj, { root }) => {
        return db.setting.findUnique({ where: { id: root?.id } }).user()
    },
}
