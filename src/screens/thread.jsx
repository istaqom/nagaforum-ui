import { NavBar } from '../components/navbar';
import { ThreadDetails } from '../grouped_components/thread_details';
import { Footer } from '../components/footer';

export const ThreadScreen = () => {
    return (
        <>
            <NavBar />
            <ThreadDetails />
            <Footer />
        </>
    )
}