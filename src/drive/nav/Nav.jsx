import React, { useState } from 'react';
import { FaClock, FaCompass, FaStar, FaTrash } from "react-icons/fa";
import { MdArrowRight } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import Logout from './Logout';
export default function Nav() {
    const [hidesidebar, setHidesidebar] = useState(false)
    const [open, setOpen] = useState(false)
    const logout = () => {
        setOpen(true)
    }
    return (
        <div className={`w-[4rem] ease-linear  absolute ${hidesidebar ? "left-[-3.5rem]" : ''} md:left-0 md:relative rounded-br-[4rem] md:rounded-br-none  z-30 md:w-[17rem]  mt-4 bg-blue-500 dark:bg-neutral-700 rounded-tr-[4rem] justify-between flex flex-col items-center pt-8 pb-20`}>
            <div className='flex flex-col'>
                <Link to="/generatecertificate">
                    <h1 className='hidden md:block bg-white px-4 py-2 rounded-3xl font-bold dark:text-neutral-700 text-blue-500 cursor-pointer hover:text-slate-700 hover:shadow'>Create New Certificate</h1>
                </Link>
                <div className='flex flex-col gap-5 mt-8  w-4/5 p-2 font-medium *:flex *:gap-4 *:items-center *:text-xl text-blue-50'>
                    <Link to="/generatecertificate">
                        <div className="links flex items-center gap-4 text-2xl hover:text-blue-200 cursor-pointer md:hidden font-bold "><VscNewFile className='text-3xl md:text-xl' /><span className='hidden md:block'> New Certificate </span></div>
                    </Link>
                    <Link to="/home">
                        <div className="links flex items-center gap-4 text-2xl hover:text-blue-200 cursor-pointer"><FaCompass className='text-3xl md:text-2xl' /><span className='hidden md:block'> My Drive </span></div>
                    </Link>
                    {/* <Link to="Downloads">
                        <div className="links flex items-center gap-4 text-2xl hover:text-blue-200 cursor-pointer"><IoCloudDownloadSharp className='text-3xl md:text-2xl' /><span className='hidden md:block'> Downloads </span></div>
                    </Link> */}
                    <Link to="Recent">
                        <div className="links flex items-center gap-4 text-2xl hover:text-blue-200 cursor-pointer"><FaClock className='text-3xl md:text-2xl' /><span className='hidden md:block'> Recent </span></div>
                    </Link>
                    <Link to="Stared">
                        <div className="links flex items-center gap-4 text-2xl hover:text-blue-200 cursor-pointer"><FaStar className='text-3xl md:text-2xl' /><span className='hidden md:block'> Starred </span></div>
                    </Link>
                    <Link to="Trash">
                        <div className="links flex items-center gap-4 text-2xl hover:text-blue-200 cursor-pointer"><FaTrash className='text-3xl md:text-2xl' /><span className='hidden md:block'> Trash </span></div>
                    </Link>
                </div>
            </div>
            <div className='relative w-full h-full md:hidden'>
                <div className='dark:bg-blue-500 absolute h-20 flex items-center justify-center end-[0px] bottom-16 cursor-pointer dark:text-blue-500 bg-blue-400  text-blue-400 shadow w-2'
                    onClick={() => hidesidebar ? setHidesidebar(false) : setHidesidebar(true)}
                >
                    <MdArrowRight className='text-white  font-bold' />
                </div>
            </div>

            <div className='md:me-16 '>
                <div className=" flex items-center gap-4 text-2xl text-blue-50 font-bold hover:text-blue-200 cursor-pointer mb-4 mt-8" onClick={logout}><RiLogoutBoxLine className='text-3xl md:text-2xl' /><span className='hidden md:block'>Logout </span></div>
            </div>
            <Logout open={open} setOpen={setOpen} />
        </div>
    )
}
