import { NavBar } from '../components/navbar';
import { Footer } from '../components/footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateThread } from '../grouped_components/thread_create';
import { Oval } from 'react-loader-spinner'
import { useState } from 'react';

export const CreateThreadScreen = () => {
    const Navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/user", {
                method: "GET",
                credentials: "include"
            });

            if (data.status === 204) {
                Navigate("/");
            }
            setIsLoading(false);
        };

        api();
    }, [Navigate]);

    if (isLoading) {
        return <div className='w-screen h-screen flex items-center justify-center'>
            <Oval
                height={80}
                width={80}
                color="#0d0d0d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#0d0d0d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />;
        </div>
    }

    return (
        <>
            <NavBar />
            <CreateThread />
            <Footer />
        </>
    )
}