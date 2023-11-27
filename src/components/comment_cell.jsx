import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export const CommentSection = ({ comment }) => {
    const date = new Date(comment.createdAt);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: id });
    return (
        <div className='flex flex-row bg-gray-200 p-2 rounded-lg w-100 justify-between items-center'>
            <p className='break-words'>{comment.message} – <span className='text-blue-400'>{comment.user.name}</span><span> membalas {timeAgo}</span></p>
        </div>
    );
};

CommentSection.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string,
        }).isRequired,
        message: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};