import PropTypes from 'prop-types';

export const IconButton = ({ children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-full inline-flex items-center ${className}`}
        >
            {children}
        </button>
    );
}

IconButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

IconButton.defaultProps = {
    onClick: () => { },
    className: '',
};