import { NavBar } from '../components/navbar';
import { HomeThread } from '../grouped_components/home_thread';
import { Footer } from '../components/footer';

export const HomeScreen = () => {
    return (
        <>
            <NavBar />
            <HomeThread />
            <Footer />
        </>
    )
}