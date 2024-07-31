///Root.tsx
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";




const Root = () => {

    return (
        <div className="dark:bg-slate-700 bg-stone-100 flex flex-col min-h-screen main">
            <Header />
            <main className="flex-1 max-w-screen-2xl mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;
