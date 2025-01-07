import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Nav from '../nav/Nav';
export default function Home() {
    return (
        <div className='bg-white h-screen w-screen overflow-hidden'>
            <Header />
            <div className='flex w-full h-full'>
                <Nav />
                <div className="body flex-1 h-[88%] overflow-y-auto pb-20 px-4 mt-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
