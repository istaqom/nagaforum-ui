import { NavBar } from '../components/navbar';
import { Footer } from '../components/footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditThread } from '../grouped_components/edit_thread';

export const EditThreadScreen = () => {
    const Navigate = useNavigate();
    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/user", {
                method: "GET",
                credentials: "include"
            });

            if (data.status === 204) {
                Navigate("/");
            }
        };

        api();
    }, [Navigate]);
    return (
        <>
            <NavBar />
            <EditThread />
            <Footer />
        </>
    )
}