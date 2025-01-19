import React from 'react'
import { Dialog } from "@progress/kendo-react-dialogs";

export const FibaDialog = ({title, isShow = true, closeModal, width = '1000', height='500'}) => {
    const [show, setShow] = React.useState(isShow);

    const onClose = () => {
        setShow(false);
        if (closeModal) {
            closeModal();
        }
    }

    return (
        <React.Fragment>
            {show && (
                <Dialog title={title} onClose={onClose} width={width} height={height}>
                    hello
                </Dialog>
            )}
        </React.Fragment>
    )
}