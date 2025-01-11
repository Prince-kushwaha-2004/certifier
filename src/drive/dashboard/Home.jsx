import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loader from '../../loader/loader';
import Header from '../header/Header';
import Nav from '../nav/Nav';
export default function Home() {
    const { loading } = useSelector(state => state.loading)
    return (
        <div className='bg-white dark:bg-neutral-800 h-screen w-screen overflow-hidden'>
            <Header />
            <div className='flex w-full h-full'>
                <Nav />
                <div className="body flex-1 h-[97%] overflow-y-auto pb-20 px-4 mt-6">
                    <Outlet />
                </div>
            </div>
            <Loader loading={loading} />
        </div>
    )
}
