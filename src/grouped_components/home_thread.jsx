import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThreadContainer } from "../components/thread_cell";
import { SideBar } from "./sidebar";
import { useSearchParams, NavLink } from "react-router-dom";

export const HomeThread = () => {
    const [resultThreads, setThreads] = useState([]);
    const [totalThreads, setTotalThreads] = useState([]);
    let [searchParams] = useSearchParams();
    let page = searchParams.get('page') || 1;
    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/threads" + (page ? `?page=${page}` : ""), {
                method: "GET"
            });
            if (data.status === 204) {
                setThreads(false);
            } else if (data.status === 200) {
                const jsonData = await data.json();
                if (!jsonData.data || jsonData.data.length === 0) {
                    setThreads(false);
                } else {
                    setThreads(jsonData.data);
                    setTotalThreads(jsonData.meta);
                }
            }
        };

        api();
    }, [page]);

    return (
        <div className='px-20 py-20 bg-white w-screen'>
            <div className='flex flex-row justify-between'>
                <SideBar />
                <div className="flex flex-col grow pl-20 gap-8">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row justify-around relative items-center">
                            <input className="w-72 px-4 py-3 border-black border-solid border-2 rounded-lg pl-10" type="text" name="" id="" placeholder="Cari pertanyaan serupa disini" />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3" />
                        </div>
                        {/* <div className="flex flex-row gap-4">
                            <select className="w-48 px-4 py-3 border-black border-solid border-2 rounded-lg" defaultValue="default" name="" id="">
                                <option value="default" disabled>Semua diskusi</option>
                            </select>
                            <select className="w-60 px-4 py-3 border-black border-solid border-2 rounded-lg" defaultValue="default" name="" id="">
                                <option value="default" disabled>Semua Kategori</option>
                            </select>
                        </div> */}
                    </div>
                    {
                        resultThreads ? (resultThreads.map((data) => {
                            return <ThreadContainer key={data.id} thread={data} />;
                        })) : (
                            <p className="text-black text-5xl font-bold">Tidak ada thread</p>
                        )
                    }
                    <div className="flex flex-row gap-2 justify-center">
                        {
                            Math.ceil(totalThreads.total / totalThreads.limit) != 1 ?
                                Array.from({ length: Math.ceil(totalThreads.total / totalThreads.limit) }, (_, i) => i + 1).map(pageNumber => (
                                    <NavLink key={pageNumber} className={pageNumber == page || !page ? "bg-black text-white p-2 w-8 rounded-lg" : "bg-gray-200 text-black p-2 w-8 rounded-lg hover:bg-black hover:text-white"} to={"?page=" + pageNumber}>
                                        {pageNumber}
                                    </NavLink>
                                )) : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}