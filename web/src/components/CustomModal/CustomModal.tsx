import {
    forwardRef,
    ReactElement,
    ReactNode,
    useImperativeHandle,
    useState,
} from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import Modal from "react-modal"

Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.5)"
Modal.setAppElement("#redwood-app")

interface Props {
    children?: ReactNode
}
export type Ref = ReactElement

const CustomModal = forwardRef((props, ref) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        openModal() {
            openModal()
        },
        closeModal() {
            closeModal()
        },
    }))

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Folder"
        >
            <div>
                <button onClick={closeModal} className="float-right px-3">
                    <Icon icon="gravity-ui:circle-xmark" />
                </button>
                {props.children}
            </div>
        </Modal>
    )
})

export default CustomModal
