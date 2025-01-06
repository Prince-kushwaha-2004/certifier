import React from 'react';
import { CiDark, CiSearch } from "react-icons/ci";
import { MdFileDownload } from "react-icons/md";
import { useSelector } from 'react-redux';
export default function Header() {
    const { userData } = useSelector(state => state.user)
    return (
        <div className='w-screen px-8 py-4 flex justify-between items-center'>
            <div className="logo flex gap-4">
                <img src="https://www.logoai.com/oss/icons/2021/10/27/rA73APprj8wskQ0.png" className="w-8" alt="logo" />
                <h1 className="text-3xl font-bold text-blue-500">Certifier</h1>
            </div>
            <div className="hidden searchbar p-4 py-2 rounded-3xl w-[25rem] md:flex gap-4 items-center bg-blue-50 border">
                <CiSearch className='text-xl text-slate-600' />
                <input type="text" placeholder='Search Drive ...' className='bg-transparent w-full focus:outline-none' />
            </div>
            <div className="options hidden lg:flex gap-4 *:text-2xl *:text-gray-700">
                <CiDark />
                <MdFileDownload />
            </div>
            <div className="user flex gap-4 items-center">
                <p className='text-gray-600 text-xl hidden md:block'>{userData.name}</p>
                <div className='bg-blue-500 text-white font-bold w-8 h-8 text-xl rounded-full flex justify-center items-center'>{userData.name[0]}</div>
            </div>
        </div>
    )
}
