import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

export const ButtonCategory = ({ buttonText, active, location }) => {
    const navLinkClass = active ? 'flex flex-row bg-[#0d0d0d] w-64 px-4 py-3 rounded-lg text-white gap-4 items-center' : 'flex flex-row bg-white w-64 px-4 py-3 rounded-lg text-black gap-4 items-center hover:bg-[#0d0d0d] hover:text-white group';
    const divClass = active ? 'h-5 bg-white w-2 rounded-sm' : 'h-5 bg-[#0d0d0d] w-2 rounded-sm group-hover:bg-white';

    return (
        <NavLink className={navLinkClass} to={location}>
            <div className={divClass}></div>
            <p>{buttonText}</p>
        </NavLink>
    )
}

ButtonCategory.defaultProps = {
    active: false,
    location: "/",
}

ButtonCategory.propTypes = {
    buttonText: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
}