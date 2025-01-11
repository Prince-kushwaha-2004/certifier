import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apicall } from '../../utils/services';
import { validate } from '../../utils/validation';
import { loginUser } from '../features/userSlice';
import Loader from '../loader/loader';
export default function Login() {
    const [logindata, setLogindata] = useState({ email: '', password: '' })
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.loading)
    const handleChange = (event) => {
        setLogindata({
            ...logindata,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        if (userData && userData.name) {
            navigate("/home")
        }
    }, [userData])
    const handleSubmit = (event) => {
        event.preventDefault()
        const emailvalid = validate("email", logindata.email)
        if (!emailvalid.valid) {
            toast.error(emailvalid.message)
        } else {
            console.log(logindata)
            apicall("POST", "login/", logindata, '', (data) => {
                console.log(data)
                dispatch(loginUser(data.user_data))
                navigate("/home")
                toast.success(data.status)
            })
        }
    }
    return (
        <div className="flex w-full loginpage justify-center h-screen bg-gradient-to-r from-blue-100 to-white">
            <div className='w-full lg:w-1/2 xl:w-2/5 my-auto  lg:ml-16 md:px-8 bg-transparent'>
                <form className="flex gap-4 flex-col mx-auto p-16 w-full" onSubmit={handleSubmit}>
                    <h1 className="text-4xl sm:text-5xl  font-bold text-black">Welcome Back !</h1>
                    <p className='text-xl sm:text-2xl font-medium text-gray-600 mb-8'>Sign into your acount</p>
                    <div>
                        <label htmlFor="email" className='text-xl font-medium text-gray-700 '>Email</label>
                        <input id='email' autoComplete='username' className="border font-medium border-slate-500 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" name="email" value={logindata.email} onChange={handleChange} required type="email" placeholder="Email" />
                    </div>
                    <div>
                        <label htmlFor="password" className='text-xl font-medium text-gray-700 '>Password</label>
                        <input id='password' autoComplete="current-password" className="border font-medium border-slate-500 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" name="password" value={logindata.password} onChange={handleChange} required type="password" placeholder="Password" />
                    </div>
                    <button className="bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded p-2 mt-12 text-2xl" type="submit">Login</button>
                </form>
            </div>
            <div className='w-0 lg:w-1/2 xl:w-3/5 bg-transparent flex flex-col justify-center items-center'>

            </div>
            <Loader loading={loading} />
        </div>
    )
}
