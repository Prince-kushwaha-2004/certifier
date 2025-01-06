import React from 'react';
import { VscNewFolder } from "react-icons/vsc";
import Folder from '../miniComponents/Folder';
import Table from '../miniComponents/Table';

export default function MyDrive() {
    return (
        <div className='w-full h-full ps-8 overflow-hidden'>
            <div>
                <h1 className='flex gap-5 text-3xl font-bold text-blue-500 items-center'>My Driven <VscNewFolder className='text-4xl rounded-lg text-white bg-blue-500 p-2' /></h1>
            </div>
            <h1 className='text-gray-600 font-bold text-xl mt-8'>QUICK ACCESS</h1>
            <div className="folders mt-4 flex gap-8 flex-wrap">
                <Folder folderName="Download" />
                <Folder folderName="innotech" />
                <Folder folderName="IEEE" />
                <Folder folderName="New Folder" />
            </div>

            <div className='min-w-[35rem] '>
                <h1 className='text-gray-600 font-bold text-xl mt-16'>ALL FILES</h1>
                <Table />
            </div>
        </div>
    )
}
