import React, { useState } from 'react';
import { CiDark, CiSearch } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSearch } from '../../features/searchSlice';
export default function Header() {
    const { userData } = useSelector(state => state.user)
    const [isDark, setIsDark] = useState(document.body.classList.contains("dark"))
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const changeTheme = () => {
        document.body.classList.toggle('dark')
        setIsDark(isDark ? false : true)
    }
    const changeSearch = (event) => {
        setSearch(event.target.value)
        dispatch(addSearch(event.target.value))
    }
    return (
        <div className='w-screen px-8 py-4 flex justify-between items-center'>
            <Link to="/home">
                <div className="logo flex gap-4">
                    <img src="https://www.logoai.com/oss/icons/2021/10/27/rA73APprj8wskQ0.png" className="w-9" alt="logo" />
                    <h1 className="text-3xl font-bold text-blue-500">Certifier</h1>
                </div>
            </Link>
            <div className="hidden searchbar p-4 py-2 rounded-3xl w-[25rem] md:flex gap-4 items-center dark:bg-neutral-700 dark:border-neutral-800 dark:text-white bg-blue-50 border">
                <CiSearch className='text-xl text-slate-600 dark:text-white' />
                <input type="text" placeholder='Search Drive ...' value={search} onChange={changeSearch} className='bg-transparent w-full focus:outline-none' />
            </div>

            <div className="user flex gap-4 items-center">
                <div className="options hidden lg:flex gap-4 me-8 *:text-2xl *:text-gray-700 *:dark:text-white cursor-pointer">
                    {isDark ? <MdOutlineLightMode onClick={changeTheme} /> : <CiDark onClick={changeTheme} />}
                </div>
                <p className='text-gray-600 text-xl hidden md:block dark:text-blue-50'>{userData.name}</p>
                <div className='bg-blue-500 text-white font-bold w-8 h-8 text-xl rounded-full flex justify-center items-center'>{userData.name[0]}</div>
            </div>
        </div>
    )
}
