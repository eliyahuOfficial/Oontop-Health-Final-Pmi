///Navbar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { FaXmark, FaBars } from "react-icons/fa6";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import "./NavBar.scss";



const NavBar = () => {

    const { isLoggedIn, isBusiness, logout } = useAuth();

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            setTimeout(() => {
                setIsMenuOpen(false);
            }, 2000);
        }

    }






    return (

        <nav className="site-navbar max-w-screen-2xl mx-auto text-xl font-normal leading-6 tracking-tight text-gray-900   dark:text-gray-100 py-6 border-b-4 rounded-lg border-blue-300 ">
            <div className=" flex flex-row  justify-items-center items-center " >

                <NavLink to="/">
                    <div className="flex flex-row gap-6">

                        <h1 className="md:text-5xl font-semibold  mainlogo">Oontop-Health</h1>
                    </div>
                </NavLink>



                {
                    isMenuOpen && (
                        <div className="space-y-4 px-4 pt-3 pb-5 mx-2 rounded-md drop-shadow-md bg-stone-100 dark:bg-slate-700 fixed top-32 right-0 left-0 flex flex-col z-50 ">

                            {isLoggedIn && isBusiness && (
                                <>
                                    <NavLink to="/pmi" className="nav-link">PMI</NavLink>
                                    <NavLink to="/oontop" className="nav-link">OonTop</NavLink>

                                </>
                            )}
                            {!isLoggedIn && <NavLink to="/register" className="nav-link">Register</NavLink>}
                            {!isLoggedIn && <NavLink to="/login" className="nav-link">Login</NavLink>}
                            {isLoggedIn && <button onClick={() => {
                                logout();
                                navigate("/login")
                            }} className="nav-link">Logout</button>}
                        </div>
                    )
                }
            </div>



            <div className="nav-right w-full lg:w-1/2 justify-end">
                <div className="hidden lg:flex lg:flex-row  gap-4 justify-center items-center ">

                    {isLoggedIn && isBusiness && <NavLink to="/pmi" className="nav-link text-sm md:text-base lg:text-lg slate">PMI</NavLink>}

                    {isLoggedIn && isBusiness && <NavLink to="/oontop" className="nav-link text-sm md:text-base lg:text-lg slate">OonTop</NavLink>}

                    {!isLoggedIn && <NavLink to="/register" className="nav-link text-sm md:text-base lg:text-lg slate">Register</NavLink>}

                    {!isLoggedIn && <NavLink to="/login" className="nav-link text-sm md:text-base lg:text-lg slate">Login</NavLink>}

                    {isLoggedIn && (
                        <button onClick={() => {
                            logout();
                            navigate("/login");
                        }} className="nav-link text-sm md:text-base lg:text-lg slate">Logout</button>
                    )}



                </div>

                <div className="flex lg:flex-row gap-4 justify-center items-center">
                    {isLoggedIn && <NavLink to="/profile" ><FaUser className="icon" /></NavLink>}

                    <DarkModeToggle />
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none focus:text-gray-300">
                        {isMenuOpen ? (<FaXmark className="w-6 h-6 text-black dark:text-white" />) : (<FaBars className="w-6 h-6 text-black dark:text-white" />)}
                    </button>
                </div>

            </div>


        </nav >

    );
};

export default NavBar;