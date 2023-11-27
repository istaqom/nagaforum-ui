import PropTypes from 'prop-types';
import { Dialog } from '../components/dialog';
import { ModalButton } from '../components/modal_button';


export const ConfirmDialog = ({ open, onClose, title, children, onConfirm, className = '', confirmLabel = "Iya", cancelLabel = "Tidak" }) => {
    if (!open) {
        return <></>;
    }

    return (
        <Dialog open={open} onClose={onClose} className={className}>
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="py-5">{children}</div>
            <div className="flex justify-end">
                <div className="p-1">
                    <ModalButton
                        onClick={() => onClose()}
                        className="bg-white border border-[#0d0d0d] text-black"
                    >
                        {cancelLabel}
                    </ModalButton>
                </div>
                <div className="p-1">
                    <ModalButton
                        className='bg-[#0d0d0d] border border-white text-white'
                        onClick={() => {
                            onClose();
                            onConfirm();
                        }}
                    >
                        {confirmLabel}
                    </ModalButton>
                </div>
            </div>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    className: PropTypes.string,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
};