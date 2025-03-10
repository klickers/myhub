import { useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import { usePopper } from "react-popper"

import { NavLink } from "@redwoodjs/router"

interface Props {
    to: string
    icon: string
    label: string
}

const SidebarButton = (props: Props) => {
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: "arrow",
                options: {
                    element: arrowElement,
                },
            },
            { name: "offset", options: { offset: [0, 8] } },
        ],
        placement: "right",
    })

    return (
        <div className="relative flex items-center sidebar-button">
            <NavLink
                to={props.to}
                activeClassName="active-link"
                ref={setReferenceElement}
            >
                <Icon icon={props.icon} />
            </NavLink>

            <div
                ref={setPopperElement}
                style={styles.popper}
                className="tooltip"
                {...attributes.popper}
            >
                {props.label}
                <div
                    ref={setArrowElement}
                    style={styles.arrow}
                    className="arrow"
                    data-popper-arrow
                />
            </div>
        </div>
    )
}

export default SidebarButton
