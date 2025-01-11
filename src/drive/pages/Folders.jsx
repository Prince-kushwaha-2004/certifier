import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { apicall } from '../../../utils/services';
import NewFolder from '../miniComponents/NewFolder';
import Table from '../miniComponents/Table';
export default function Folders() {
    const { id } = useParams();
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)
    console.log(id)
    const getData = () => {
        apicall("get", "file-manager/", '', { folder_id: id }, (data) => {
            setData(data)
        })
    }
    useEffect(() => {
        getData()
    }, [id])
    return (
        <div className='px-8'>
            <div className='flex justify-between font-bold mb-8'>
                {data.parent_folder == null ?
                    <Link to="/home">
                        <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'>Go Back <IoArrowBack /></button>
                    </Link>
                    :
                    <Link to={`/home/Folders/${data.parent_folder}`}>
                        <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'>Go Back <IoArrowBack /></button>
                    </Link>
                }
                <div className='bg-blue-50 border  p-2 rounded-full w-1/2 px-8'>
                    <Link to={`/home`}>
                        <span>Home</span>
                    </Link>
                    {data && data.path ?
                        data.path.map((value) => {
                            return (
                                <Link to={`/home/Folders/${value.id}`}>
                                    <span>/{value.name}</span>
                                </Link>
                            )
                        })
                        : ''}
                </div>
                <button onClick={() => setOpen(true)} className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'>New Folder <FaPlus /></button>
            </div>
            <Table data={data} getData={getData} setData={setData} />
            <NewFolder open={open} setOpen={setOpen} id={id} getData={getData} setData={setData} />
        </div >
    )
}
