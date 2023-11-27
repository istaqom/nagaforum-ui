import PropTypes from 'prop-types';

export const ModalButton = ({ type = 'button', children, onClick, className = '' }) => {
    return (
        <button
            className={`font-bold py-2 px-4 rounded ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

ModalButton.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    className: PropTypes.string,
};