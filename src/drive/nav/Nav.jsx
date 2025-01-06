import React from 'react';
import toast from 'react-hot-toast';
import { FaClock, FaCompass, FaStar, FaTrash } from "react-icons/fa";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apicall } from '../../../utils/services';
import { logoutUser } from '../../features/userSlice';
export default function Nav() {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const logout = () => {
        apicall("GET", "application/json", "logout/", '', '', (data) => {
            dispatch(logoutUser())
            toast.success(data.status)
        })
    }
    return (
        <div className='w-[4rem] md:w-[18rem] mt-8 bg-blue-500 rounded-tr-[4rem] justify-between flex flex-col items-center pt-8 pb-20'>
            <div className='flex flex-col'>
                <Link to="/generatecertificate">
                    <h1 className='hidden md:block bg-white px-4 py-2 rounded-3xl font-bold text-blue-500 cursor-pointer'>Create New Certificate</h1>
                </Link>
                <div className='flex flex-col gap-5 mt-8  w-4/5 p-2 font-bold *:flex *:gap-4 *:items-center *:text-xl text-blue-50'>
                    <Link to="/generatecertificate">
                        <div className="links hover:text-blue-200 cursor-pointer md:hidden font-bold "><VscNewFile className='text-3xl md:text-xl' /><span className='hidden md:block'> New Certificate </span></div>
                    </Link>
                    <div className="links hover:text-blue-200 cursor-pointer"><FaCompass className='text-4xl md:text-xl' /><span className='hidden md:block'> My Drive </span></div>
                    <div className="links hover:text-blue-200 cursor-pointer"><IoCloudDownloadSharp className='text-4xl md:text-xl' /><span className='hidden md:block'> Downloads </span></div>
                    <div className="links hover:text-blue-200 cursor-pointer"><FaClock className='text-4xl md:text-xl' /><span className='hidden md:block'> Recent </span></div>
                    <div className="links hover:text-blue-200 cursor-pointer"><FaStar className='text-4xl md:text-xl' /><span className='hidden md:block'> Stared </span></div>
                    <div className="links hover:text-blue-200 cursor-pointer"><FaTrash className='text-4xl md:text-xl' /><span className='hidden md:block'> Trash </span></div>
                </div>
            </div>
            <div className='flex flex-col gap-5  w-4/5 p-2 font-bold *:flex *:gap-4 *:items-center *:text-xl text-blue-50'>
                <div className="links hover:text-blue-200 cursor-pointer mt-8" onClick={logout}><RiLogoutBoxLine className='text-4xl md:text-xl' /><span className='hidden md:block'>Logout </span></div>
            </div>
        </div>
    )
}
