import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { ConfirmDialog } from '../grouped_components/confirm_dialog';

export const NavBar = () => {
    let userProfile;
    const navigate = useNavigate();
    const [resultUser, setUser] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
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

    const handleLogout = () => {
        navigate("https://api-forum.panti.my.id/logout")
    }

    useEffect(() => {
        if (confirmOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [confirmOpen]);

    if (resultUser) {
        userProfile =
            <div className="flex flex-row gap-4 items-center">
                <NavLink to="">
                    {/* <FontAwesomeIcon className="w-8 h-8 border border-black p-1.5 rounded-full" icon={faUser} /> */}
                    <img className="w-12 h-12 border border-black rounded-full" src={resultUser.google_photos} alt="user-photos" />
                </NavLink>
                <button onClick={() => setConfirmOpen(true)}>
                    <FontAwesomeIcon className="w-8 h-8 text-red-700" icon={faSignOut} />
                </button>
                <ConfirmDialog
                    title="Logout"
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={handleLogout}
                >
                    Apakah anda yakin ingin logout?
                </ConfirmDialog>
            </div>
    } else {
        userProfile = <NavLink className="bg-black text-white py-1.5 px-5 rounded-lg" to="https://api-forum.panti.my.id/login">Login</NavLink>;
    }
    const currentRoute = window.location.href;
    return (
        <nav className="flex flex-row bg-gray justify-between py-2.5 px-20 w-screen">
            <NavLink to="/">
                <img className="w-16 h-18" src={logo} alt="logo-nagaforum" />
            </NavLink>
            <div className="flex flex-row items-center gap-8">
                <NavLink className="text-gray-500 hover:text-gray-800 hover:font-bold" to="">Semua Path Belajar</NavLink>
                <NavLink className="text-gray-500 hover:text-gray-800 hover:font-bold" to="">Tentang Kami</NavLink>
                <NavLink className={["http://localhost:5173/", "https://forum.panti.my.id/"].includes(currentRoute) ? "text-gray-800 font-bold" : "text-gray-500 hover:text-gray-800 hover:font-bold"} to="/">Forum Diskusi</NavLink>
                <NavLink className="text-gray-500 hover:text-gray-800 hover:font-bold" to="">Sandbox</NavLink>
                <NavLink className="text-gray-500 hover:text-gray-800 hover:font-bold" to="">Dukung Kami</NavLink>
                <div className="h-8  bg-[#0d0d0d] w-[0.05rem] rounded-sm"></div>
                {userProfile}
            </div>
        </nav>
    )
}