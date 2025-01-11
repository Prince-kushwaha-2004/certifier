import React, { useEffect, useState } from 'react';
import { VscNewFolder } from "react-icons/vsc";
import { apicall } from '../../../utils/services';
import Folder from '../miniComponents/Folder';
import NewFolder from '../miniComponents/NewFolder';
import Table from '../miniComponents/Table';
export default function MyDrive() {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    const [initialrender, setInitialrender] = useState(true)
    let id = 5
    const createFolder = () => {
        console.log(open)
        setOpen(true)
    }
    const getData = () => {
        apicall("get", "file-manager/", '', '', (data) => {
            setData(data)
        })
    }
    useEffect(() => {
        if (initialrender) {
            getData()
            setInitialrender(false)
        }

    }, [initialrender])

    return (
        <div className='w-full h-full ps-8 overflow-auto'>
            <div>
                <h1 className='flex gap-5 text-3xl font-bold text-blue-500 dark:text-white items-center'>My Drive <VscNewFolder className='text-4xl rounded-lg text-white bg-blue-500 dark:bg-neutral-700   hover:bg-blue-400 hover:shadow-xl p-2' onClick={createFolder} /></h1>
            </div>
            <h1 className='text-gray-600 dark:text-gray-50 font-bold text-xl mt-8'>QUICK ACCESS</h1>
            <div className="folders mt-4 flex gap-8 flex-wrap">
                <Folder folderName="Download" />
                <Folder folderName="innotech" />
                <Folder folderName="IEEE" />
                <Folder folderName="New Folder" />
            </div>

            <div className='min-w-[35rem] '>
                <h1 className='text-gray-600 font-bold text-xl mt-16 dark:text-gray-50'>ALL FILES</h1>
                <Table data={data} getData={getData} setData={setData} />
            </div>
            <NewFolder open={open} setOpen={setOpen} id={null} getData={getData} setData={setData} />
        </div>
    )
}
