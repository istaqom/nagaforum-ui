import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CommentSection } from './comment_cell';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ConfirmDialog } from '../grouped_components/confirm_dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
// import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import rehypeRaw from 'rehype-raw';

export const ReplyContainer = ({ replies, threadData }) => {
    let commentSection, timeAgo, dropdownComponent;
    const [resultComments, setComments] = useState([]);
    const [resultUser, setUser] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmEditOpen, setConfirmEditOpen] = useState(false);
    const [confirmSolvedOpen, setConfirmSolvedOpen] = useState(false);
    const [message, setMessage] = useState('');

    if (replies.createdAt == replies.updatedAt) {
        const date = new Date(replies.createdAt);
        timeAgo = "Membalas " + formatDistanceToNow(date, { addSuffix: true, locale: id });
    } else {
        const date = new Date(replies.updatedAt);
        timeAgo = "Mengedit balasannya " + formatDistanceToNow(date, { addSuffix: true, locale: id }) + " yang dibuat pada " + date.toISOString().slice(0, 16).replace('T', ' ');
    }
    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/reply/" + replies.id + "/comment", {
                method: "GET"
            });
            if (data.status === 200) {
                const jsonData = await data.json();
                setComments(jsonData.data);
            } else if (data.status === 204) {
                setComments(false);
            }

            const userData = await fetch("https://api-forum.panti.my.id/api/v1/user", {
                method: "GET",
                credentials: "include"
            });

            if (userData.status === 204) {
                setUser(false);
            } else if (userData.status === 200) {
                const jsonData = await userData.json();
                setUser(jsonData);
            }
        };

        api();
    }, [replies.id]);

    const handleDelete = async () => {
        const response = await fetch("https://api-forum.panti.my.id/api/v1/reply/" + replies.id, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();

        if (data.code === 200) {
            window.location.reload(false);
        } else {
            console.log("Error");
        }
    }

    const handleEdit = async () => {
        const response = await fetch(`https://api-forum.panti.my.id/api/v1/reply/` + replies.id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (data.code === 202) {
            window.location.reload(false);
        } else {
            console.log("Error");
        }
    }

    const handleSolved = async () => {
        const response = await fetch(`https://api-forum.panti.my.id/api/v1/thread/${threadData.id}/reply/${replies.id}`, {
            method: "PUT",
            credentials: "include",
        });

        const data = await response.json();

        if (data.code === 202) {
            window.location.reload(false);
        } else {
            console.log("Error");
        }
    }

    if (resultComments) {
        commentSection = <div className='flex flex-col gap-2'>
            {
                resultComments.map((data) => {
                    return <CommentSection key={data.id} comment={data} />
                })
            }
        </div>
    }

    useEffect(() => {
        if (dropdown == "Edit") {
            setDropdown("");
            setConfirmEditOpen(true);
        } else if (dropdown == "Delete") {
            setDropdown("");
            setConfirmOpen(true);
        } else if (dropdown == "Set as Best Answer") {
            setDropdown("");
            setConfirmSolvedOpen(true);
        }

        if (confirmOpen || confirmEditOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [dropdown, confirmOpen, confirmEditOpen]);

    if (resultUser.id == replies.user_id && resultUser.id == threadData.user_id) {
        const options = [
            `Set as Best Answer`,
            `Edit`,
            `Delete`
        ];
        dropdownComponent = <Dropdown
            menuClassName='w-48 right-0'
            onChange={e => setDropdown(e.value)}
            controlClassName='bg-transparent border-0 hover:shadow-none hover:cursor-pointer'
            arrowClassName="hidden"
            options={options}
            value={dropdown}
            placeholderClassName='flex justify-end'
            placeholder={
                <FontAwesomeIcon icon={faEllipsisV} />
            } />
    } else if (resultUser.id == replies.user_id) {
        const options = [
            `Edit`,
            `Delete`
        ];
        dropdownComponent = <Dropdown
            menuClassName='w-48 right-0'
            onChange={e => setDropdown(e.value)}
            controlClassName='bg-transparent border-0 hover:shadow-none hover:cursor-pointer'
            arrowClassName="hidden"
            options={options}
            value={dropdown}
            placeholderClassName='flex justify-end'
            placeholder={
                <FontAwesomeIcon icon={faEllipsisV} />
            } />
    } else if (resultUser.id == threadData.user_id) {
        const options = [
            `Set as Best Answer`
        ];
        dropdownComponent = <Dropdown
            menuClassName='w-48 right-0'
            onChange={e => setDropdown(e.value)}
            controlClassName='bg-transparent border-0 hover:shadow-none hover:cursor-pointer'
            arrowClassName="hidden"
            options={options}
            value={dropdown}
            placeholderClassName='flex justify-end'
            placeholder={
                <FontAwesomeIcon icon={faEllipsisV} />
            } />
    }
    return (
        <div className={`flex flex-col w-100 gap-2 ${threadData.best_answer_id == replies.id ? "border-b-4 border-[#4CAF50] rounded-lg" : ""}`}>
            <div className='flex flex-row bg-gray-200 p-4 rounded-lg w-100 gap-4'>
                <img className='rounded-lg w-24 h-24' src={replies.user.photos} alt="user-profiles" referrerPolicy="no-referrer" />
                <div className='flex flex-col w-full gap-2.5'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-blue-400 font-bold'>{replies.user.name}</p>
                        {dropdownComponent}
                        <ConfirmDialog
                            title="Hapus Jawaban"
                            open={confirmOpen}
                            onClose={() => setConfirmOpen(false)}
                            onConfirm={handleDelete}
                        >
                            Apakah anda yakin ingin menghapus jawaban ini?
                        </ConfirmDialog>
                        <ConfirmDialog
                            className='max-w-[50%]'
                            title="Edit Jawaban"
                            open={confirmEditOpen}
                            onClose={() => setConfirmEditOpen(false)}
                            onConfirm={handleEdit}
                            confirmLabel='Edit'
                            cancelLabel='Batal'
                        >
                            <textarea className='border-2 border-black rounded-lg p-4' name="" id="" cols="70" rows="10" defaultValue={replies.message} onChange={e => setMessage(e.target.value)}></textarea>
                        </ConfirmDialog>
                        <ConfirmDialog
                            className='max-w-2xl'
                            title="Apakah yakin menjadikan ini sebagai jawaban terbaik?"
                            open={confirmSolvedOpen}
                            onClose={() => setConfirmSolvedOpen(false)}
                            onConfirm={handleSolved}
                        >
                            Apakah anda yakin ingin menjadikan jawaban ini sebagai jawaban terbaik?
                        </ConfirmDialog>
                    </div>
                    <p className='pr-4 text-justify whitespace-pre-wrap'>{replies.message}</p>
                    <p className='text-left text-sm pt-4'>{timeAgo}</p>
                </div>
            </div>
            {commentSection}
        </div>
    );
};

ReplyContainer.propTypes = {
    replies: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            photos: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        message: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
    }).isRequired,
    threadData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        best_answer_id: PropTypes.number,
    })
};