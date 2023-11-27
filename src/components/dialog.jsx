import PropTypes from 'prop-types';
import { IconButton } from './icon_button';
import { ExitIcon } from './exit_icon';

export const Dialog = ({ children, open, onClose, className = "" }) => {
    if (!open) {
        return <></>;
    }
    return (
        <div className="fixed inset-0 z-50 overflow-auto flex bg-black bg-opacity-50">
            <div className={`relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg ${className}`}>
                <div>{children}</div>
                <span className="absolute top-0 right-0 p-4">
                    <IconButton onClick={() => onClose()}>
                        <ExitIcon />
                    </IconButton>
                </span>
            </div>
        </div>
    );
}

Dialog.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
};