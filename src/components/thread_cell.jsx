import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { NavLink } from 'react-router-dom';

export const ThreadContainer = ({ thread }) => {
    let timeAgo;

    if (thread.createdAt == thread.updatedAt) {
        const date = new Date(thread.createdAt);
        timeAgo = "dibuat " + formatDistanceToNow(date, { addSuffix: true, locale: id });
    } else {
        const date = new Date(thread.updatedAt);
        timeAgo = "diedit " + formatDistanceToNow(date, { addSuffix: true, locale: id });
    }
    return (
        <NavLink className='flex flex-row bg-gray-200 p-4 rounded-lg w-100 gap-4' to={'/thread/' + thread.id}>
            <img className='rounded-lg w-24 h-24' src={thread.user.photos} alt="user-profiles" referrerPolicy="no-referrer" />
            <div className='flex flex-col w-full'>
                <div className='flex flex-row justify-between'>
                    <p className='text-lg font-bold text-black overflow-ellipsis text-left'>{thread.title}</p>
                    <div className='flex items-center gap-4'>
                        <p className='text-sm'><FontAwesomeIcon className='items-center pr-2' icon={faCommentAlt} />{thread.reply_count} komentar</p>
                        <div className="flex items-center border border-[#0d0d0d] bg-[#0d0d0d] rounded-lg px-6 py-1">
                            <p className="text-sm font-bold text-white">{thread.category.name}</p>
                        </div>
                    </div>
                </div>
                <p className='pt-2.5 text-justify'>{thread.message_preview}</p>
                <div className='flex flex-row pt-2.5 items-center gap-2 text-sm'>
                    <p className='text-blue-400'>{thread.user.name}</p>
                    <p>{timeAgo}</p>
                </div>
            </div>
        </NavLink>
    );
};

ThreadContainer.propTypes = {
    thread: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            photos: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        title: PropTypes.string.isRequired,
        reply_count: PropTypes.number.isRequired,
        message_preview: PropTypes.string.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
    }).isRequired,
};