import React, { useState } from 'react';
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Header() {
    const [isDark, setIsDark] = useState(document.body.classList.contains("dark"))
    const { userData } = useSelector(state => state.user)
    const changeTheme = () => {
        document.body.classList.toggle('dark')
        setIsDark(isDark ? false : true)
    }
    return (
        <div className='w-screen px-8 py-4 flex justify-between items-center'>
            <Link to="/home">
                <div className="logo flex gap-4">
                    <img src="https://www.logoai.com/oss/icons/2021/10/27/rA73APprj8wskQ0.png" className="w-9" alt="logo" />
                    <h1 className="text-3xl font-bold text-blue-500">Certifier</h1>
                </div>
            </Link>
            <div className="user flex gap-4 items-center">
                <div className="options hidden lg:flex me-8 gap-4 *:text-2xl *:text-gray-700 *:dark:text-white cursor-pointer">
                    {isDark ? <MdOutlineLightMode onClick={changeTheme} /> : <CiDark onClick={changeTheme} />}

                </div>
                <p className='text-gray-600 text-xl dark:text-white hidden md:block'>{userData.name}</p>
                <div className='bg-blue-500 text-white font-bold w-8 h-8 text-xl rounded-full flex justify-center items-center'>{userData.name[0]}</div>
            </div>
        </div>
    )
}
