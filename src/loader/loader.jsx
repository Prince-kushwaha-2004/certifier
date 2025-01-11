import React from 'react'
import loader from '../assets/loader.gif'

export default function Loader({ loading }) {

    return (
        <div className={`w-screen ${loading ? "" : "hidden"} h-screen bg-transparent flex z-50 justify-center items-center absolute top-0 left-0`}>
            <img src={loader} alt="" />
        </div>
    )
}
