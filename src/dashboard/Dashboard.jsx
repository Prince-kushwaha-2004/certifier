import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../nav/Nav'
export default function Dashboard() {
    return (
        <>
            <div className='w-full '>
                <Nav />
            </div>
            <div className='flex justify-between mx-4 xl:mx-52 mt-32 '>
                <div className='lg:w-2/3'>
                    <h1 className='text-5xl md:text-7xl font-bold'>Online <span className='text-blue-500'>Certificate Maker</span> </h1>
                    <p className='text-xl md:text-2xl mt-4 text-slate-600'>
                        Generate beautiful certificates for your students or colleagues and download in zip format.
                        The certificate maker tool is designed as a free way to quickly create and download certificates for anything you want. <br />
                        Just provide Template and CSV file of Data and Let Certifier do Your Work.
                    </p>
                    <Link to="generatecertificate">
                        <button className='bg-gradient-to-r from-blue-600 to-blue-400 text-xl px-8 py-2 text-white rounded-lg mt-16 font-bold'>Try Now</button>
                    </Link>
                </div>
                <img src="./src/assets/bg2.jpg" className='hidden md:block absolute right-0 top-0 h-full -z-10' alt="" />
            </div>
        </>
    )
}
