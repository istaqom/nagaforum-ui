import logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom"

export const Footer = () => {
    return (
        <footer className="w-screen bg-black pt-10 px-20 pb-8">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-16 h-18" src={logo} alt="logo-nagaforum" />
                        <p className="text-3xl text-white font-semibold">NAGABELAJAR</p>
                    </div>
                    <div>
                        <p className="text-lg text-white text-justify">Pendidikan koding berkualitas dan interaktif</p>
                        <p className="text-lg text-white text-justify">yang dikelola oleh Mahasiswa ITK dan Komunitas.</p>
                    </div>
                </div>
                <div className="flex flex-row text-white gap-12">
                    <div className="flex flex-col gap-4">
                        <p className="text-left text-lg font-semibold">Tentang</p>
                        <div className="flex flex-col text-left">
                            <NavLink to="">Tentang Kami</NavLink>
                            <NavLink to="">Testimoni</NavLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-left text-lg font-semibold">Dukungan</p>
                        <div className="flex flex-col text-left">
                            <NavLink to="">FAQ</NavLink>
                            <NavLink to="">Contribute</NavLink>
                            <NavLink to="">Kontak Kami</NavLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-left text-lg font-semibold">Panduan</p>
                        <div className="flex flex-col text-left">
                            <NavLink to="">Panduan Komunitas</NavLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-left text-lg font-semibold">Legalisasi</p>
                        <div className="flex flex-col text-left">
                            <NavLink to="">Terms</NavLink>
                            <NavLink to="">Privacy Policy</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-20 text-white">
                <hr />
                <p className="pt-5">Made with <FontAwesomeIcon icon={faHeart} style={{ color: "#d90d0d", }} /> in Indonesia, Kalimantan Institute of Technology © 2023 NagaBelajar</p>
            </div>
        </footer>
    )
}