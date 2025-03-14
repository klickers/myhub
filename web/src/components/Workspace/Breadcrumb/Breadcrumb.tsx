import { Icon } from "@iconify/react/dist/iconify.js"
import { Item, ItemType } from "types/graphql"

import { Link, routes } from "@redwoodjs/router"

interface Props {
    item: Item
}

const Breadcrumb = ({ item }: Props) => {
    return (
        <Link
            to={
                item.type == ("FOLDER" as ItemType)
                    ? routes.workspaceFolder({
                          slug: item.slug,
                      })
                    : routes.workspaceProject({
                          slug: item.slug,
                      })
            }
            className="no-underline flex items-center hover:underline"
        >
            {item.name}
            <Icon icon="gravity-ui:chevron-right" className="ml-1" />
        </Link>
    )
}

export default Breadcrumb
