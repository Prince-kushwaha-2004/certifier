import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { apicall } from '../utils/services';
import { loginUser } from './features/userSlice';
const Root = () => {
  const dispatch = useDispatch()
  apicall("GET", "login/", '', '', (data) => {
    console.log(data.user_data)
    dispatch(loginUser(data.user_data))
  })

  return (
    <main className="h-screen w-screen overflow-hidden bg-white dark:bg-neutral-800">
      <Toaster />
      <Outlet />
    </main>
  )
}

export default Root