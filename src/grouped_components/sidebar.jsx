import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ButtonCategory } from "../components/button";

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

export const SideBar = () => {
    const [resultUser, setUser] = useState([]);

    useEffect(() => {
        fetchUser().then(setUser);
    }, []);

    return (
        <div className='flex flex-col gap-8'>
            {resultUser && (
                <NavLink className="flex border-[#0d0d0d] border-solid border-2 w-64 items-center justify-center px-4 py-3 bg-[#0d0d0d] rounded-lg" to="/thread/create">
                    <div className="w-fit font-normal text-white">
                        Buat diskusi
                    </div>
                </NavLink>
            )}
            <div className='flex flex-col gap-4 text-left'>
                <ButtonCategory buttonText="Semua Diskusi" active={true} location="/"/>
                {resultUser && (
                    <div className="flex flex-col gap-4 py-4">
                        <ButtonCategory buttonText="Pertanyaan Saya" />
                        <ButtonCategory buttonText="Partisipasi Saya" />
                        <ButtonCategory buttonText="Jawaban Terbaik Saya" />
                    </div>
                )}
                <ButtonCategory buttonText="Populer Minggu Ini" />
                <ButtonCategory buttonText="Populer Sepanjang Masa" />
                <ButtonCategory buttonText="Terselesaikan" />
                <ButtonCategory buttonText="Belum Terselesaikan" />
                <ButtonCategory buttonText="Pertanyaan Terlama" />
                <ButtonCategory buttonText="Belum Ada Jawaban" />
                {/* <ButtonCategory buttonText="Papan Peringkat" /> soon not now */}
            </div>
        </div>
    )
}