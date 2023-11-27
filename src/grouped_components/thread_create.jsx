import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SideBar } from "./sidebar";

export const CreateThread = () => {
    const navigate = useNavigate();
    const [resultCategories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://api-forum.panti.my.id/api/v1/categories?limit=100", {
                method: "GET"
            });
            const jsonData = await data.json();
            setCategories(jsonData.data);
        };

        api();
    }, []);

    const handleSubmit = async () => {
        const response = await fetch("https://api-forum.panti.my.id/api/v1/thread", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category_id: categoryId,
                title: title,
                message: message
            })
        });

        const data = await response.json();

        if (data.code === 201) {
            Navigate(`/thread/${data.data.id}`, { replace: true });
        } else {
            setErrorMessage('Failed to create thread. Please try again.');
        }
    }

    return (
        <div className='px-20 py-20 bg-white w-screen'>
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
                            <p className='text-lg font-bold'>Buat Thread</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-100 gap-4'>
                        {errorMessage && <div className='bg-red-400 p-4 rounded-lg font-bold text-white text-lg'>{errorMessage}</div>}
                        <p className='font-bold text-left text-lg'>Judul Thread</p>
                        <input className="border-2 border-black rounded-lg p-3" type="text" name="judul_thread" id="judul_thread" placeholder='Ketik judul thread disini' onChange={e => setTitle(e.target.value)} />
                        <p className='font-bold text-left text-lg'>Pilih Kategori</p>
                        <select value={categoryId} className="border-2 border-black rounded-lg p-3" name="category" id="category" onChange={e => setCategoryId(e.target.value)}>
                            <option value="" disabled>Select a category</option>
                            {resultCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <p className='font-bold text-left text-lg'>Pertanyaan</p>
                        <textarea className="border-2 border-black rounded-lg p-4" name="pertanyaan_thread" id="pertanyaan_thread" cols="30" rows="10" placeholder="Ketik pertanyaanmu disini" onChange={e => setMessage(e.target.value)}></textarea>
                        <button className="w-100 bg-black text-white border-2 border-black rounded-lg p-3" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}