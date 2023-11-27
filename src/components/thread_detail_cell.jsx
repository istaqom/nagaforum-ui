import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ConfirmDialog } from '../grouped_components/confirm_dialog';
// import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import rehypeRaw from 'rehype-raw';

const fetchUser = async () => {
    const data = await fetch("https://api-forum.panti.my.id/api/v1/user", {
        method: "GET",
        credentials: "include"
    });

    if (data.status === 204) {
        return false;
    } else if (data.status === 200) {
        const jsonData = await data.json();
        return jsonData;
    }
};

export const ThreadDetailContainer = ({ thread }) => {
    const navigate = useNavigate();
    const [resultUser, setUser] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleDelete = async () => {
        const response = await fetch("https://api-forum.panti.my.id/api/v1/thread/" + thread.id, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();

        if (data.code === 200) {
            navigate("/", { replace: true });

        } else {
            console.log("Error");
        }
    }

    useEffect(() => {

        fetchUser().then(setUser);

        if (dropdown == "Edit") {
            setDropdown("");
            navigate("/thread/edit/" + thread.id);
        } else if (dropdown == "Delete") {
            setDropdown("");
            setConfirmOpen(true);
        }

        if (confirmOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [thread.id, dropdown, navigate, confirmOpen]);

    const options = [
        `Edit`,
        `Delete`
    ];

    return (
        <div className='flex flex-row bg-gray-200 p-4 rounded-lg w-100 gap-4'>
            <img className='rounded-lg w-24 h-24' src={thread.user.photos} alt="user-profiles" referrerPolicy="no-referrer" />
            <div className='flex flex-col w-full gap-2.5'>
                <div className='flex flex-row justify-between'>
                    <p className='text-blue-400 font-bold'>{thread.user.name}</p>
                    {
                        resultUser.id == thread.user_id ?
                            <Dropdown
                                onChange={e => setDropdown(e.value)}
                                controlClassName='bg-transparent border-0 flex justify-end hover:shadow-none hover:cursor-pointer'
                                arrowClassName="hidden"
                                options={options}
                                value={dropdown}
                                placeholderClassName='flex justify-end'
                                placeholder={
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                } />
                            : ""
                    }
                    <ConfirmDialog
                        title="Hapus Thread"
                        open={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        onConfirm={handleDelete}
                    >
                        Apakah anda yakin ingin menghapus thread ini?
                    </ConfirmDialog>
                </div>
                {/* <div className='flex flex-row bg-white rounded-lg p-4 break-all mr-4'> */}
                <p className='text-2xl font-bold text-black text-left break-all'>{thread.title}</p>
                {/* </div> */}
                <p className='pr-4 text-justify whitespace-pre-wrap'>{thread.message}</p>
            </div>
        </div>
    );
};

ThreadDetailContainer.propTypes = {
    thread: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            photos: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
};