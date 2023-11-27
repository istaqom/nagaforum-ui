import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { ThreadDetailContainer } from "../components/thread_detail_cell";
import { SideBar } from "./sidebar";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // import the styles
import { ReplyContainer } from "../components/reply_cell";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";

export const ThreadDetails = () => {
    const navigate = useNavigate();
    const idThread = useParams();
    let replyInputSection, replySection, bestReplySection;
    const [resultThread, setThread] = useState([]);
    const [resultReplyThread, setReplyThread] = useState([]);
    const [resultBestReplyThread, setBestReplyThread] = useState([]);
    const [resultUser, setUser] = useState([]);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [totalRepliesThreads, setTotalRepliesThreads] = useState([]);
    let [searchParams] = useSearchParams();
    let page = searchParams.get('page') || 1;

    const handleSubmit = async () => {
        const response = await fetch(`https://api-forum.panti.my.id/api/v1/thread/${idThread.id}/reply`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (data.code === 201) {
            window.location.reload(false);
        } else {
            setErrorMessage('Failed to post reply. Please try again.');
        }
    }

    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/thread/" + idThread.id, {
                method: "GET"
            });
            if (data.status === 200) {
                const jsonData = await data.json();
                setThread([jsonData.data]);
            } else if (data.status === 204) {
                setReplyThread(false);
            }
        };

        api();
    }, [idThread.id]);

    useEffect(() => {
        if (resultThread.length > 0) {
            if (resultThread[0].best_answer_id) {
                const api = async () => {
                    const data = await fetch("https://api-forum.panti.my.id/api/v1/reply/" + resultThread[0].best_answer_id, {
                        method: "GET"
                    });
                    if (data.status === 200) {
                        const jsonData = await data.json();
                        setBestReplyThread([jsonData.data]);
                    } else if (data.status === 204) {
                        setBestReplyThread(false);
                    }
                };

                api();
            }
        }
    }, [resultThread]);

    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/thread/" + idThread.id + "/replies" + (page ? `?page=${page}` : ""), {
                method: "GET"
            });
            if (data.status === 200) {
                const jsonData = await data.json();
                if (!jsonData.data || jsonData.data.length === 0) {
                    setReplyThread(false);
                } else {
                    setReplyThread(jsonData.data);
                    setTotalRepliesThreads(jsonData.meta);
                }
            } else if (data.status === 204) {
                setReplyThread(false);
            }
        };

        api();
    }, [idThread.id, page]);
    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/user", {
                method: "GET",
                credentials: "include"
            });

            if (data.status === 204) {
                setUser(false);
            } else if (data.status === 200) {
                const jsonData = await data.json();
                setUser(jsonData);
            }
        };

        api();
    }, []);
    if (resultUser) {
        replyInputSection = <div className="flex flex-col gap-2 w-100">
            <p className="text-2xl font-bold text-left">Tulis jawabanmu disini</p>
            <div className="flex flex-col w-100">
                {/* <ReactQuill theme="snow" /> */}
                <textarea className="border-t-2 border-r-2 border-l-2 border-black rounded-t-lg p-4" name="komentar_thread" id="komentar_thread" cols="30" rows="4" placeholder="Ketik jawabanmu disini" onChange={e => setMessage(e.target.value)}></textarea>
                <button className="w-100 bg-black text-white border-2 border-black rounded-b-lg py-1" onClick={handleSubmit}>Submit</button>
                {/* <button className="w-100 bg-black text-white border-4 border-black rounded-b-lg py-1">Submit</button> */}
            </div>
        </div>;
    }
    if (resultBestReplyThread.length > 0) {
        bestReplySection = <div className="flex flex-col gap-4 w-100 pt-4">
            <p className="text-2xl font-bold text-left">Jawaban terbaik</p>
            {
                <>
                    <ReplyContainer replies={resultBestReplyThread[0]} threadData={resultThread[0]} />
                </>
            }
        </div>
    }
    if (resultReplyThread) {
        replySection = <div className="flex flex-col gap-4 w-100">
            <p className="text-2xl font-bold text-left">Jawaban mereka</p>
            {
                resultReplyThread.map((data) => {
                    return <ReplyContainer key={data.id} replies={data} threadData={resultThread[0]} />;
                })
            }
        </div>
    } else {
        replySection = <div className="flex flex-col gap-1">
            <p className="text-black text-3xl font-bold">Tidak ada Jawaban</p>
            <p>Jadilah yang pertama</p>
        </div>;
    }
    return (
        <>
            {
                resultThread.map((data) => {
                    let timeAgo;

                    if (data.createdAt == data.updatedAt) {
                        const date = new Date(data.createdAt);
                        timeAgo = "memulai diskusi " + formatDistanceToNow(date, { addSuffix: true, locale: id });
                    } else {
                        const date = new Date(data.updatedAt);
                        timeAgo = "diedit " + formatDistanceToNow(date, { addSuffix: true, locale: id }) + " yang dibuat pada " + date.toISOString().slice(0, 16).replace('T', ' ');
                    }
                    return (
                        <div key={data.id} className='px-20 py-20 bg-white w-screen'>

                            <div className='flex flex-row justify-between'>
                                <SideBar />
                                <div className="flex flex-col grow pl-20 gap-8">
                                    <div className="flex flex-row justify-between gap-8">
                                        <div className="flex flex-row justify-around relative items-center">
                                            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 absolute left-3" />
                                            <button className="w-25 px-4 py-3 border-black border-solid border-b-2 pl-10" onClick={() => navigate(-1)}>
                                                <p>Kembali</p>
                                            </button>
                                        </div>
                                        <div className="flex flex-row gap-4 grow border-black border-2 items-center p-4 rounded-lg justify-between">
                                            <p className="text-left"><span className="text-blue-400">{data.user.name}</span> <span>{timeAgo}</span></p>
                                            <div className='flex items-center gap-4'>
                                                <p className='text-sm'><FontAwesomeIcon className='items-center pr-2' icon={faCommentAlt} />{data.reply_count} komentar</p>
                                                <div className="flex items-center border border-blue-400 bg-blue-400 rounded-lg px-6 py-1">
                                                    <p className="text-sm font-bold text-white">{data.category.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {errorMessage && <div className='bg-red-400 p-4 rounded-lg font-bold text-white text-lg'>{errorMessage}</div>}
                                    <ThreadDetailContainer key={data.id} thread={data} />
                                    {replyInputSection}
                                    {bestReplySection}
                                    {replySection}
                                    <div className="flex flex-row gap-2 justify-center">
                                        {
                                            Math.ceil(totalRepliesThreads.total / totalRepliesThreads.limit) != 1 ?
                                                Array.from({ length: Math.ceil(totalRepliesThreads.total / totalRepliesThreads.limit) }, (_, i) => i + 1).map(pageNumber => (
                                                    <NavLink key={pageNumber} className={pageNumber == page || !page ? "bg-black text-white p-2 w-8 rounded-lg" : "bg-gray-200 text-black p-2 w-8 rounded-lg hover:bg-black hover:text-white"} to={"?page=" + pageNumber} replace>
                                                        {pageNumber}
                                                    </NavLink>
                                                )) : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}