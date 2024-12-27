import React from 'react';
import toast from 'react-hot-toast';
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apicall } from '../../utils/services';
import { logoutUser } from '../features/userSlice';
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
        <div className='flex justify-between items-center xl:mx-52'>
            <div className="logo flex gap-4 items-center p-4">
                <img src="https://www.logoai.com/oss/icons/2021/10/27/rA73APprj8wskQ0.png" className="w-10" alt="logo" />
                <h1 className="text-4xl font-bold text-slate-900">Certifier</h1>
            </div>
            <div className="btns p-4">
                {userData && userData.name ?
                    <div className='flex items-center justify-center gap-4 text-2xl'>
                        <FaUser />
                        <h1 className='text-2xl font-bold'>{userData.name}</h1>
                        <button className='bg-gradient-to-r from-blue-600 to-blue-400 text-xl px-8 py-2 text-white rounded-lg font-bold' onClick={logout}>
                            Logout
                        </button>
                    </div>
                    :
                    <Link to="login">
                        <button className='bg-gradient-to-r from-blue-600 to-blue-400 text-xl px-8 py-2 text-white rounded-lg font-bold' >
                            Login
                        </button>
                    </Link>
                }

            </div>

        </div>
    )
}
